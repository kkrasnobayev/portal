@echo off
setlocal

for /F "tokens=*" %%g in ('git rev-parse --show-toplevel') do (set HOOK_DIR=%%g)

cd %HOOK_DIR%

call git-hooks/pre-commit-check-install.bat
call git-hooks/pre-push-check-install.bat

endlocal
