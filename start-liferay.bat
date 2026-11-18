@echo off
chcp 65001 >nul
title Liferay 7.4 Server [Debug - Porta 8000]

:: Forca o uso do JDK 21 LTS (suportado pelo Liferay 7.4 e Elasticsearch Sidecar)
set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-21.0.12.101-hotspot"
set "JRE_HOME=%JAVA_HOME%"
set "PATH=%JAVA_HOME%\bin;%PATH%"

set "LIFERAY_HOME=H:\1.Ambiente\Ambiente-Liferay-7.4\4-liferay-portal-tomcat-7.4.3.132-ga132-1739912568-H2"

for /d %%D in ("%LIFERAY_HOME%\tomcat*") do (
    set "CATALINA_HOME=%%~fD"
)

if not defined CATALINA_HOME (
    echo [ERRO] Pasta do Tomcat nao encontrada dentro de:
    echo %LIFERAY_HOME%
    pause
    exit /b 1
)

set "CATALINA_BASE=%CATALINA_HOME%"
set "CATALINA_TMPDIR=%CATALINA_HOME%\temp"

:: Configuracoes de Debug (JPDA) padrao do Liferay IDE
set "JPDA_TRANSPORT=dt_socket"
set "JPDA_ADDRESS=8000"
set "JPDA_SUSPEND=n"

:: Propriedades extras do Liferay IDE (Developer Mode)
set "CATALINA_OPTS=%CATALINA_OPTS% -Dexternal-properties=portal-developer.properties"

echo ===============================================================================
echo  Iniciando Liferay 7.4 em Modo DEBUG (Estilo Liferay IDE)
echo  JAVA_HOME     : %JAVA_HOME%
echo  CATALINA_HOME : %CATALINA_HOME%
echo  JPDA_ADDRESS  : %JPDA_ADDRESS% (%JPDA_TRANSPORT%)
echo  DEV MODE      : portal-developer.properties
echo ===============================================================================

cd /d "%CATALINA_HOME%\bin"
call catalina.bat jpda run


