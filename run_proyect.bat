@echo off
title "Lanzador Fullstack - Spring Boot & Angular"

:: --- AUTO-DETECCION DE JAVA_HOME ---

:: 1. Probar rutas conocidas primero (Empresa y Casa)
if exist "C:\Users\practicas.e5\AppData\Local\Programs\Eclipse Adoptium\jdk-17.0.18.8-hotspot\bin\java.exe" (
    set "JAVA_HOME=C:\Users\practicas.e5\AppData\Local\Programs\Eclipse Adoptium\jdk-17.0.18.8-hotspot"
    goto :found_java
)
if exist "C:\Program Files\Java\jdk-17\bin\java.exe" (
    set "JAVA_HOME=C:\Program Files\Java\jdk-17"
    goto :found_java
)

:: 2. Intentar buscar en el PATH del sistema
for /f "delims=" %%i in ('where java.exe 2^>nul') do (
    :: Evitar el javapath de Oracle que es solo un acceso directo
    echo %%i | findstr /v /i "javapath" >nul
    if not errorlevel 1 (
        for %%A in ("%%i\..\..") do set "JAVA_HOME=%%~fA"
        if exist "%JAVA_HOME%\bin\java.exe" goto :found_java
    )
)

:: 3. Verificar si ya estaba en las variables de entorno y es valido
if exist "%JAVA_HOME%\bin\java.exe" goto :found_java

echo [ERROR] No se ha podido encontrar JDK 17.
echo Por favor, instala Java o configura JAVA_HOME manualmente.
pause
exit /b 1

:found_java
:: Asegurar que no hay comillas dobles antes de concatenar
set "JAVA_HOME=%JAVA_HOME:"=%"
echo Java detectado en: %JAVA_HOME%
set "PATH=%JAVA_HOME%\bin;C:\Program Files\Git\cmd;%PATH%"


:: 1. Iniciar el Backend (Spring Boot)
echo Iniciando Backend en una nueva ventana...
start "BACKEND - Spring Boot" cmd /k "cd backend && mvnw.cmd spring-boot:run"

:: 2. Iniciar el Frontend (Angular)
echo Iniciando Frontend en una nueva ventana...
start "FRONTEND - Angular" cmd /k "cd frontend && npm start"

echo.
echo ==========================================
echo Frontend: http://localhost:4200
echo ==========================================
pause