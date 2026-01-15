@echo off
echo Starting git sync > push_log.txt
git pull origin main --allow-unrelated-histories >> push_log.txt 2>&1
echo Pull attempt finished >> push_log.txt
git push -u origin main >> push_log.txt 2>&1
echo Push finished >> push_log.txt
