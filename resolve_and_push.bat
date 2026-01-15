@echo off
echo Resolving conflict > push_log.txt
git add README.md >> push_log.txt 2>&1
echo Added README >> push_log.txt
git commit -m "Merge remote-tracking branch 'origin/main'" >> push_log.txt 2>&1
echo Commit done >> push_log.txt
git push -u origin main >> push_log.txt 2>&1
echo Push done >> push_log.txt
