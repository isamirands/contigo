# Script de deploy para Contigo
Write-Host "Iniciando deploy de Contigo..." -ForegroundColor Cyan

$S3_BUCKET = "contigo-app-frontend-949965900747"
$CLOUDFRONT_COMMENT = "Contigo App Distribution"

Write-Host "Compilando proyecto..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error en el build. Abortando deploy." -ForegroundColor Red
    exit 1
}

Write-Host "Build completado exitosamente" -ForegroundColor Green

Write-Host "Verificando credenciales de AWS..." -ForegroundColor Yellow
aws sts get-caller-identity --query "Account" --output text 2>$null

if ($LASTEXITCODE -ne 0) {
    Write-Host "Credenciales de AWS expiradas o invalidas." -ForegroundColor Red
    exit 1
}

Write-Host "Credenciales validas" -ForegroundColor Green

Write-Host "Subiendo archivos a S3..." -ForegroundColor Yellow
aws s3 sync dist/ s3://$S3_BUCKET/ --delete

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error al subir archivos a S3" -ForegroundColor Red
    exit 1
}

Write-Host "Archivos subidos a S3" -ForegroundColor Green

Write-Host "Obteniendo ID de distribucion de CloudFront..." -ForegroundColor Yellow
$DISTRIBUTION_ID = aws cloudfront list-distributions --query "DistributionList.Items[?Comment=='$CLOUDFRONT_COMMENT'].Id" --output text

if ([string]::IsNullOrWhiteSpace($DISTRIBUTION_ID)) {
    Write-Host "No se pudo encontrar la distribucion de CloudFront" -ForegroundColor Red
    exit 1
}

Write-Host "Distribucion encontrada: $DISTRIBUTION_ID" -ForegroundColor Green

Write-Host "Invalidando cache de CloudFront..." -ForegroundColor Yellow
$INVALIDATION_ID = aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*" --query "Invalidation.Id" --output text

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error al invalidar cache" -ForegroundColor Red
    exit 1
}

Write-Host "Invalidacion creada: $INVALIDATION_ID" -ForegroundColor Green
Write-Host "Deploy completado exitosamente!" -ForegroundColor Green
Write-Host "URL: https://d1uzwm1k9gs3r4.cloudfront.net" -ForegroundColor Cyan
Write-Host "La invalidacion del cache puede tardar 1-2 minutos" -ForegroundColor Yellow
