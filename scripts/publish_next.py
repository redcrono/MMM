#!/usr/bin/env python3
"""
scripts/publish_next.py
Automates daily publishing for MegaMoneyMomentum.
Scans content_queue/ for the next available day package,
rewrites pubDate to today's date (KST), moves files to src/content/blog/
and public/images/, then cleans up the queue folder.
"""

import os
import re
import sys
import json
import shutil
from datetime import datetime, timezone, timedelta

def get_today_kst():
    # Korea Standard Time (UTC+9)
    kst = timezone(timedelta(hours=9))
    now = datetime.now(kst)
    return now.strftime("%Y-%m-%d")

def update_frontmatter_pubdate(content: str, pub_date_str: str) -> str:
    # Replace pubDate in frontmatter
    # Matches: pubDate: 2026-01-01 or pubDate: "2026-01-01" or pubDate: 2026-09-28
    updated = re.sub(
        r'(pubDate:\s*)[\'\"]?\d{4}-\d{2}-\d{2}[\'\"]?',
        rf'\g<1>{pub_date_str}',
        content,
        count=1
    )
    return updated

def main():
    repo_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    queue_dir = os.path.join(repo_root, "content_queue")
    blog_dir = os.path.join(repo_root, "src", "content", "blog")
    images_dir = os.path.join(repo_root, "public", "images")

    if not os.path.exists(queue_dir):
        print(f"[Daily Publisher] Queue directory does not exist: {queue_dir}")
        sys.exit(0)

    # Find day folders: e.g. day-01, day-02, etc.
    day_folders = [
        d for d in os.listdir(queue_dir)
        if os.path.isdir(os.path.join(queue_dir, d)) and (d.startswith("day-") or d.startswith("day_"))
    ]
    day_folders.sort()

    if not day_folders:
        print("[Daily Publisher] Queue is currently empty. No posts to publish.")
        sys.exit(0)

    target_day = day_folders[0]
    target_path = os.path.join(queue_dir, target_day)
    info_path = os.path.join(target_path, "info.json")

    if not os.path.exists(info_path):
        print(f"[Daily Publisher] Error: Missing info.json in {target_path}")
        sys.exit(1)

    with open(info_path, "r", encoding="utf-8") as f:
        info = json.load(f)

    ko_file = info.get("ko_file", "ko.mdx")
    en_file = info.get("en_file", "en.mdx")
    hero_file = info.get("hero_file", "hero.jpg")
    
    target_ko_name = info.get("target_ko_name")
    target_en_name = info.get("target_en_name")
    target_hero_name = info.get("target_hero_name")

    today_str = get_today_kst()
    print(f"[Daily Publisher] Processing {target_day} for publish date {today_str}")

    # 1. Copy hero image if present
    src_hero = os.path.join(target_path, hero_file)
    if os.path.exists(src_hero) and target_hero_name:
        os.makedirs(images_dir, exist_ok=True)
        dest_hero = os.path.join(images_dir, target_hero_name)
        shutil.copy2(src_hero, dest_hero)
        print(f"  -> Deployed hero image: {target_hero_name}")

    # 2. Process Korean post
    src_ko = os.path.join(target_path, ko_file)
    if os.path.exists(src_ko) and target_ko_name:
        with open(src_ko, "r", encoding="utf-8") as f:
            ko_content = f.read()
        ko_content = update_frontmatter_pubdate(ko_content, today_str)
        dest_ko = os.path.join(blog_dir, target_ko_name)
        with open(dest_ko, "w", encoding="utf-8") as f:
            f.write(ko_content)
        print(f"  -> Published Korean post: {target_ko_name}")

    # 3. Process English post
    src_en = os.path.join(target_path, en_file)
    if os.path.exists(src_en) and target_en_name:
        with open(src_en, "r", encoding="utf-8") as f:
            en_content = f.read()
        en_content = update_frontmatter_pubdate(en_content, today_str)
        dest_en = os.path.join(blog_dir, target_en_name)
        with open(dest_en, "w", encoding="utf-8") as f:
            f.write(en_content)
        print(f"  -> Published English post: {target_en_name}")

    # 4. Remove processed queue folder
    shutil.rmtree(target_path)
    remaining = len(day_folders) - 1
    print(f"[Daily Publisher] Successfully published {target_day}. Remaining queued days: {remaining}")

if __name__ == "__main__":
    main()
