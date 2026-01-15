@echo off
echo Starting git operations > push_log.txt
git init >> push_log.txt 2>&1
echo Git init done >> push_log.txt
git add . >> push_log.txt 2>&1
echo Git add done >> push_log.txt
git commit -m "Pushing project to GitHub" >> push_log.txt 2>&1
echo Git commit done >> push_log.txt
git branch -M main >> push_log.txt 2>&1
git remote remove origin >> push_log.txt 2>&1
git remote add origin https://github.com/dnyaneshwar-19/Space-world-prototype.git >> push_log.txt 2>&1
echo Remote configured >> push_log.txt
git push -u origin main >> push_log.txt 2>&1
echo Git push done >> push_log.txt
