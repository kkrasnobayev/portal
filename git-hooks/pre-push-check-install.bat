@echo off
if exist .git\hooks\pre-push (
    del .git\hooks\pre-push
)
