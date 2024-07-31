@echo off
if exist .git\hooks\pre-commit (
    del .git\hooks\pre-commit
)
mklink /H .git\hooks\pre-commit git-hooks\pre-commit-check
