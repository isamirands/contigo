# Contigo 🐧

Aplicación de salud y bienestar para el manejo de condiciones crónicas como diabetes, asma, hipertensión y dislipidemia. Acompaña a Tigo el pingüino en tu viaje hacia una vida más saludable.

🌐 **Demo en vivo**: [https://d1uzwm1k9gs3r4.cloudfront.net](https://d1uzwm1k9gs3r4.cloudfront.net)

## Descripción

Contigo es una plataforma integral que ayuda a las personas a gestionar su salud de manera gamificada y comunitaria. Los usuarios pueden:

- Crear y seguir hábitos saludables organizados por niveles de dificultad
- Participar en foros especializados por condición de salud
- Visualizar su progreso personal y compararse con la comunidad global
- Formar equipos y competir de manera amigable
- Acceder a contenido educativo sobre manejo de condiciones crónicas
- Personalizar su experiencia con avatares de pingüino

## Tecnologías

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- React Router (navegación)
- TanStack Query (gestión de estado)
- shadcn/ui + Radix UI (componentes)
- Tailwind CSS (estilos)
- Recharts (visualización de datos)
- Vite PWA (Progressive Web App)

### Backend
- TypeScript
- API REST



### Cloud
- AWS S3 + CloudFront (hosting estático)

## Instalación

### Prerrequisitos
- Node.js 18+
- npm o pnpm

### Pasos

```bash
# Clonar el repositorio
git clone <https://github.com/isamirands/contigo.git>
cd contigo

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# El servidor estará disponible en http://localhost:8080
```

## Scripts disponibles

```bash
# Desarrollo
npm run dev              # Inicia servidor de desarrollo en puerto 8080

# Producción
npm run build            # Compila para producción
npm run build:dev        # Compila en modo desarrollo
npm run preview          # Vista previa de build de producción

# Calidad de código
npm run lint             # Ejecuta ESLint
```

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# API Configuration
VITE_API_URL=http://localhost:3000

# AWS Configuration (para deployment)
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=...
```

## Estructura del proyecto

```
contigo/
├── public/                    # Archivos estáticos
│   ├── audio/                # Archivos de audio
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── frontend/             # Código del frontend
│   │   ├── components/       # Componentes reutilizables
│   │   │   ├── ui/          # Componentes base de shadcn/ui
│   │   │   ├── BottomNav.tsx
│   │   │   └── UnifiedHeader.tsx
│   │   └── pages/           # Páginas de la aplicación
│   │       ├── Home.tsx
│   │       ├── Journey.tsx
│   │       ├── GlobalJourney.tsx
│   │       ├── NewHabit.tsx
│   │       ├── Metrics.tsx
│   │       ├── ExplorarForos.tsx
│   │       ├── Teams.tsx
│   │       ├── Scoreboard.tsx
│   │       └── Settings.tsx
│   ├── backend/              # Lógica del servidor
│   │   └── api/             # Endpoints de la API
│   ├── services/             # Servicios y utilidades
│   ├── shared/               # Código compartido
│   │   └── constants/       # Constantes globales
│   ├── assets/               # Imágenes y recursos
│   ├── App.tsx              # Componente raíz
│   └── main.tsx             # Punto de entrada
├── aws-config/               # Configuraciones de AWS
└── dist/                     # Build de producción
```

## Características principales

### Sistema de hábitos gamificado
- 6 categorías: Nutrición, Ejercicio, Agua, Medicación, Aprendizaje, Monitoreo
- 3 niveles de dificultad: Fácil, Intermedio, Avanzado
- Sistema de favoritos y seguimiento de progreso

### Comunidad de apoyo
- Foros especializados por condición (Diabetes, Asma, Hipertensión, Dislipidemia)
- Sistema de posts con likes y comentarios
- Moderación por profesionales de salud
- Filtros: Todos, Amigos, Míos, Me gusta, Guardados

### Métricas y visualización
- Dashboard personal de progreso
- Comparación con comunidad global
- Gráficos interactivos con Recharts
- Seguimiento de racha (streak)

### Sistema de equipos
- Creación y gestión de equipos
- Tabla de posiciones
- Competencias amigables
- Motivación grupal

### Progressive Web App (PWA)
- Instalable en dispositivos móviles
- Funciona offline
- Notificaciones push
- Experiencia nativa

## Arquitectura y estructura de datos

### Arquitectura del sistema

![Arquitectura del sistema](./docs/architecture-diagram.png)

En la figura se muestra la arquitectura propuesta para soportar potencialmente a casi un millón de pacientes (40% de los 2.5M con diabetes tipo 2 en el Perú), definimos una arquitectura mobile-first y altamente escalable en AWS. La app móvil se integra con AWS Amplify, que simplifica la configuración y la autenticación con Amazon Cognito, y se conecta a AWS AppSync como capa GraphQL. AppSync delega la lógica inmediata a un AWS Lambda “Solver”, que resuelve validaciones rápidas y enruta las peticiones hacia un Application Load Balancer (ALB) que distribuye el tráfico al backend en Amazon EC2. Desde la app también utilizamos Amazon Pinpoint para telemetría de uso y campañas de notificaciones in-app orientadas a adherencia y engagement.

El backend en EC2 implementa la lógica de negocio de hábitos, clanes, gamificación y perfil clínico; persiste la información en Amazon Aurora, con un nodo principal de escritura y un duplicado de Aurora. Para recuperar diagnósticos y recetas desde los sistemas de las clínicas, usamos un VPN Gateway (túnel site-to-site) que permite al backend conectarse a esos sistemas en una red privada, evitando exponer bases de datos o servicios sensibles a internet. Toda la actividad del backend y de la capa de APIs se registra en Amazon CloudWatch, desde donde obtenemos logs y métricas que se usan como insumo de observabilidad y analítica.

Sobre esa base de datos transaccional y los logs operativos construimos la capa de inteligencia. Los eventos relevantes y datos agregados se almacenan y consultan en Amazon Redshift, donde calculamos patrones de uso, adherencia y variables de comportamiento. Con esa información entrenamos y ejecutamos en batch un modelo de predicción de abandono en Amazon SageMaker; los resultados son procesados por una AWS Lambda que genera mensajes por paciente y los envía a Amazon SQS. Otra Lambda consumidora de la cola decide la mejor acción y dispara notificaciones personalizadas mediante Amazon SNS y Pinpoint, permitiendo intervenir de forma proactiva cuando un paciente muestra alto riesgo de dejar de usar la app o abandonar su tratamiento.

![alt text](<architecture-images/Arquitectura Contigo.png>)

### Modelo de datos

El modelo de datos de Contigo está diseñado para soportar una experiencia gamificada y comunitaria centrada en el paciente.

![alt text](architecture-images/estructura-datos.png)

El modelo utiliza relaciones uno-a-muchos y muchos-a-muchos para permitir flexibilidad en la asignación de hábitos, participación en equipos y foros, mientras mantiene la integridad referencial y permite consultas eficientes para dashboards y reportes.

### Flujo de datos principal

1. **Usuario** → Selecciona hábitos desde el catálogo
2. **Frontend** → Envía petición a API
3. **Backend** → Procesa y almacena en base de datos
4. **Base de datos** → Retorna confirmación
5. **Frontend** → Actualiza UI y muestra progreso

## Uso

### Desarrollo local
1. Abre la aplicación en http://localhost:8080
2. Navega por las diferentes secciones usando el menú inferior
3. Agrega hábitos desde la página "Nuevo hábito"
4. Participa en los foros de la comunidad
5. Revisa tus métricas y progreso
6. Únete o crea un equipo

### Producción
Visita la aplicación desplegada en: [https://d1uzwm1k9gs3r4.cloudfront.net](https://d1uzwm1k9gs3r4.cloudfront.net)

## Deployment

### AWS S3 + CloudFront

```bash
# Build de producción
npm run build

# Los archivos estarán en ./dist
# Subir a S3 y configurar CloudFront según aws-config/
```

Ver configuraciones en la carpeta `aws-config/`:
- `cloudfront-distribution.json` - Configuración de CloudFront
- `s3-cloudfront-policy.json` - Políticas de acceso
- `bucket-policy.json` - Política del bucket S3

## Contribuciones

Este proyecto fue desarrollado por:

- **[Isabel Miranda]** - Arquitectura y deployment
- **[Carlos Castillo]** - Diseño UI/UX
- **[Carla García]** - Diseño UI/UX
- **[Harumi Palomino]** - Desarrollo frontend y backend

