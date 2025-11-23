#!/bin/bash
# Script de deploy para Contigo (Linux/Mac)
# Compila el proyecto y lo sube a AWS S3 + CloudFront

echo "🐧 Iniciando deploy de Contigo..."

# Variables
S3_BUCKET="contigo-app-frontend-949965900747"
CLOUDFRONT_COMMENT="Contigo App Distribution"

# Paso 1: Build de producción
echo ""
echo "📦 Compilando proyecto..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Error en el build. Abortando deploy."
    exit 1
fi

echo "✅ Build completado exitosamente"

# Paso 2: Verificar credenciales de AWS
echo ""
echo "🔐 Verificando credenciales de AWS..."
aws sts get-caller-identity --query "Account" --output text > /dev/null 2>&1

if [ $? -ne 0 ]; then
    echo "❌ Credenciales de AWS expiradas o inválidas."
    echo "Por favor ejecuta: aws sso login"
    exit 1
fi

echo "✅ Credenciales válidas"

# Paso 3: Subir archivos a S3
echo ""
echo "☁️  Subiendo archivos a S3..."
aws s3 sync dist/ s3://$S3_BUCKET/ --delete

if [ $? -ne 0 ]; then
    echo "❌ Error al subir archivos a S3"
    exit 1
fi

echo "✅ Archivos subidos a S3"

# Paso 4: Obtener ID de distribución de CloudFront
echo ""
echo "🌐 Obteniendo ID de distribución de CloudFront..."
DISTRIBUTION_ID=$(aws cloudfront list-distributions --query "DistributionList.Items[?Comment=='$CLOUDFRONT_COMMENT'].Id" --output text)

if [ -z "$DISTRIBUTION_ID" ]; then
    echo "❌ No se pudo encontrar la distribución de CloudFront"
    exit 1
fi

echo "✅ Distribución encontrada: $DISTRIBUTION_ID"

# Paso 5: Invalidar caché de CloudFront
echo ""
echo "🔄 Invalidando caché de CloudFront..."
INVALIDATION_ID=$(aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*" --query "Invalidation.Id" --output text)

if [ $? -ne 0 ]; then
    echo "❌ Error al invalidar caché"
    exit 1
fi

echo "✅ Invalidación creada: $INVALIDATION_ID"

# Resumen
echo ""
echo "🎉 Deploy completado exitosamente!"
echo "📍 URL: https://d1uzwm1k9gs3r4.cloudfront.net"
echo "⏳ La invalidación del caché puede tardar 1-2 minutos"
