"""Find abrupt visual transitions in a local video with FFmpeg."""
import argparse
import json
import re
import subprocess
from pathlib import Path


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("video", type=Path)
    parser.add_argument("-o", "--output", type=Path, required=True)
    parser.add_argument("--threshold", type=float, default=0.30)
    args = parser.parse_args()
    if not args.video.is_file() or not 0 <= args.threshold <= 1:
        parser.error("Provide a local video and a threshold between 0 and 1.")
    video_filter = f"select=gt(scene\\,{args.threshold}),showinfo"
    try:
        run = subprocess.run(
            ["ffmpeg", "-nostdin", "-hide_banner", "-i", str(args.video.resolve()),
             "-an", "-sn", "-vf", video_filter, "-f", "null", "-"],
            capture_output=True, text=True, check=True,
        )
    except FileNotFoundError:
        parser.exit(1, "Install FFmpeg and add it to PATH.\n")
    except subprocess.CalledProcessError as error:
        parser.exit(1, error.stderr)
    timestamps = [float(value) for value in re.findall(
        r"\bn:\s*\d+.*?\bpts_time:([-+\d.eE]+)", run.stderr
    )]
    cuts = sorted({round(value, 6) for value in timestamps if value > 0})
    args.output.write_text(json.dumps({"video": args.video.name, "cuts_seconds": cuts},
                                      indent=2) + "\n", encoding="utf-8")
    print(f"{len(cuts)} cuts → {args.output}")


if __name__ == "__main__":
    main()
