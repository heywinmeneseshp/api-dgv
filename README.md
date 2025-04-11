# 🍌 Backend – Supervisión de Calidad en Cultivos de Banano

Este repositorio contiene el backend del sistema de supervisión de calidad en cultivos de banano, diseñado para apoyar a empresas agrícolas en el control, registro y análisis de la información generada en campo.

## 🚀 MVP – Producto Mínimo Viable

La primera versión funcional del sistema incluye:

- **Autenticación y configuración inicial**
  - Inicio de sesión con credenciales predeterminadas (`admin` / `admin`)
  - Solicitud de cambio de contraseña en el primer ingreso
  - Registro de datos básicos de la empresa
  - Carga automática de semanas del año

- **Gestión de Maestros**
  - Fincas, lotes, zonas (con creación automática de lote 0 y zona 0)
  - Labores, grupos de labores, ítems
  - Usuarios y tipos de usuario
  - Frutas, motivos, tipos
  - Comercializadoras, compañías propietarias y agrupaciones de fincas
  - Funciones de CRUD y cargue masivo desde Excel o CSV

- **Formularios**
  - **PTF (Parte de Trabajo en Finca)**: registro semanal por zona y grupo de labores
  - **Calibración de Largo**: longitud y grosor de fruta por finca y semana
  - **Merma Rápida**: pérdidas por tipo, fruta y motivo

- **Reportes**
  - Exportación de datos en formatos CSV, Excel o PDF

