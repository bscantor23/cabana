-- CreateTable
CREATE TABLE "rol" (
    "id_rol" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nombre" VARCHAR(50) NOT NULL,
    "descripcion" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rol_pkey" PRIMARY KEY ("id_rol")
);

-- CreateTable
CREATE TABLE "tipo_documento" (
    "id_tipo_documento" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nombre" VARCHAR(70) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tipo_documento_pkey" PRIMARY KEY ("id_tipo_documento")
);

-- CreateTable
CREATE TABLE "pais" (
    "id_pais" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nombre" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pais_pkey" PRIMARY KEY ("id_pais")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id_usuario" UUID NOT NULL DEFAULT gen_random_uuid(),
    "id_rol" UUID NOT NULL,
    "id_tipo_documento" UUID NOT NULL,
    "id_pais" UUID NOT NULL,
    "numero_identificacion" VARCHAR(30) NOT NULL,
    "correo_electronico" VARCHAR(100) NOT NULL,
    "clave" VARCHAR(100) NOT NULL,
    "primer_nombre" VARCHAR(70) NOT NULL,
    "segundo_nombre" VARCHAR(70) NOT NULL,
    "primer_apellido" VARCHAR(70) NOT NULL,
    "segundo_apellido" VARCHAR(70) NOT NULL,
    "direccion_residencia" VARCHAR(200) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "usuario_telefono" (
    "id_usuario" UUID NOT NULL,
    "telefono" VARCHAR(30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuario_telefono_pkey" PRIMARY KEY ("id_usuario","telefono")
);

-- CreateTable
CREATE TABLE "departamento" (
    "id_departamento" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nombre" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "departamento_pkey" PRIMARY KEY ("id_departamento")
);

-- CreateTable
CREATE TABLE "ciudad" (
    "id_ciudad" UUID NOT NULL DEFAULT gen_random_uuid(),
    "id_departamento" UUID NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ciudad_pkey" PRIMARY KEY ("id_ciudad")
);

-- CreateTable
CREATE TABLE "barrio" (
    "id_barrio" UUID NOT NULL DEFAULT gen_random_uuid(),
    "id_ciudad" UUID NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "barrio_pkey" PRIMARY KEY ("id_barrio")
);

-- CreateTable
CREATE TABLE "tipo_alojamiento" (
    "id_tipo_alojamiento" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nombre" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tipo_alojamiento_pkey" PRIMARY KEY ("id_tipo_alojamiento")
);

-- CreateTable
CREATE TABLE "alojamiento" (
    "id_alojamiento" UUID NOT NULL DEFAULT gen_random_uuid(),
    "id_propietario" UUID NOT NULL,
    "id_tipo_alojamiento" UUID NOT NULL,
    "id_barrio" UUID NOT NULL,
    "descripcion" TEXT NOT NULL,
    "direccion_fisica" VARCHAR(200) NOT NULL,
    "cupo_persona" SMALLINT NOT NULL,
    "numero_habitaciones" SMALLINT NOT NULL,
    "numero_banos" SMALLINT NOT NULL,
    "tiene_calefaccion" BOOLEAN NOT NULL,
    "permite_mascotas" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "alojamiento_pkey" PRIMARY KEY ("id_alojamiento")
);

-- CreateTable
CREATE TABLE "fotografia_alojamiento" (
    "id_fotografia_alojamiento" UUID NOT NULL DEFAULT gen_random_uuid(),
    "id_alojamiento" UUID NOT NULL,
    "descripcion" VARCHAR(500) NOT NULL,
    "uri" VARCHAR(200) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fotografia_alojamiento_pkey" PRIMARY KEY ("id_fotografia_alojamiento")
);

-- CreateTable
CREATE TABLE "reserva" (
    "id_reserva" UUID NOT NULL DEFAULT gen_random_uuid(),
    "id_alojamiento" UUID NOT NULL,
    "id_arrendatario" UUID NOT NULL,
    "numero_personas" SMALLINT NOT NULL,
    "incluye_mascotas" BOOLEAN NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL,
    "fecha_inicio" TIMESTAMP(3) NOT NULL,
    "fecha_fin" TIMESTAMP(3) NOT NULL,
    "valor_calculado" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reserva_pkey" PRIMARY KEY ("id_reserva")
);

-- CreateTable
CREATE TABLE "tipo_pago" (
    "id_tipo_pago" UUID NOT NULL DEFAULT gen_random_uuid(),
    "nombre" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tipo_pago_pkey" PRIMARY KEY ("id_tipo_pago")
);

-- CreateTable
CREATE TABLE "pago_reserva" (
    "id_pago_reserva" UUID NOT NULL DEFAULT gen_random_uuid(),
    "id_reserva" UUID NOT NULL,
    "id_tipo_pago" UUID NOT NULL,
    "fecha_historico" TIMESTAMP(3) NOT NULL,
    "valor_cancelado" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pago_reserva_pkey" PRIMARY KEY ("id_pago_reserva")
);

-- CreateTable
CREATE TABLE "encuesta_reserva" (
    "id_encuesta_reserva" UUID NOT NULL DEFAULT gen_random_uuid(),
    "id_reserva" UUID NOT NULL,
    "calificacion" SMALLINT NOT NULL,
    "comentario" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "encuesta_reserva_pkey" PRIMARY KEY ("id_encuesta_reserva")
);

-- CreateTable
CREATE TABLE "temporada" (
    "id_temporada" UUID NOT NULL DEFAULT gen_random_uuid(),
    "descripcion" VARCHAR(100) NOT NULL,
    "fecha_inicio" DATE NOT NULL,
    "fecha_fin" DATE NOT NULL,
    "porcentaje" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "temporada_pkey" PRIMARY KEY ("id_temporada")
);

-- CreateTable
CREATE TABLE "temporada_reserva" (
    "id_reserva" UUID NOT NULL,
    "id_temporada" UUID NOT NULL,
    "valor_hospedaje" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "temporada_reserva_pkey" PRIMARY KEY ("id_reserva","id_temporada")
);

-- CreateIndex
CREATE UNIQUE INDEX "rol_nombre_key" ON "rol"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "tipo_documento_nombre_key" ON "tipo_documento"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "pais_nombre_key" ON "pais"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_correo_electronico_key" ON "usuario"("correo_electronico");

-- CreateIndex
CREATE UNIQUE INDEX "tipo_alojamiento_nombre_key" ON "tipo_alojamiento"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "tipo_pago_nombre_key" ON "tipo_pago"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "encuesta_reserva_id_reserva_key" ON "encuesta_reserva"("id_reserva");

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_id_rol_fkey" FOREIGN KEY ("id_rol") REFERENCES "rol"("id_rol") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_id_tipo_documento_fkey" FOREIGN KEY ("id_tipo_documento") REFERENCES "tipo_documento"("id_tipo_documento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_id_pais_fkey" FOREIGN KEY ("id_pais") REFERENCES "pais"("id_pais") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario_telefono" ADD CONSTRAINT "usuario_telefono_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ciudad" ADD CONSTRAINT "ciudad_id_departamento_fkey" FOREIGN KEY ("id_departamento") REFERENCES "departamento"("id_departamento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "barrio" ADD CONSTRAINT "barrio_id_ciudad_fkey" FOREIGN KEY ("id_ciudad") REFERENCES "ciudad"("id_ciudad") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alojamiento" ADD CONSTRAINT "alojamiento_id_propietario_fkey" FOREIGN KEY ("id_propietario") REFERENCES "usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alojamiento" ADD CONSTRAINT "alojamiento_id_tipo_alojamiento_fkey" FOREIGN KEY ("id_tipo_alojamiento") REFERENCES "tipo_alojamiento"("id_tipo_alojamiento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alojamiento" ADD CONSTRAINT "alojamiento_id_barrio_fkey" FOREIGN KEY ("id_barrio") REFERENCES "barrio"("id_barrio") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fotografia_alojamiento" ADD CONSTRAINT "fotografia_alojamiento_id_alojamiento_fkey" FOREIGN KEY ("id_alojamiento") REFERENCES "alojamiento"("id_alojamiento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reserva" ADD CONSTRAINT "reserva_id_alojamiento_fkey" FOREIGN KEY ("id_alojamiento") REFERENCES "alojamiento"("id_alojamiento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reserva" ADD CONSTRAINT "reserva_id_arrendatario_fkey" FOREIGN KEY ("id_arrendatario") REFERENCES "usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pago_reserva" ADD CONSTRAINT "pago_reserva_id_reserva_fkey" FOREIGN KEY ("id_reserva") REFERENCES "reserva"("id_reserva") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pago_reserva" ADD CONSTRAINT "pago_reserva_id_tipo_pago_fkey" FOREIGN KEY ("id_tipo_pago") REFERENCES "tipo_pago"("id_tipo_pago") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "encuesta_reserva" ADD CONSTRAINT "encuesta_reserva_id_reserva_fkey" FOREIGN KEY ("id_reserva") REFERENCES "reserva"("id_reserva") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "temporada_reserva" ADD CONSTRAINT "temporada_reserva_id_reserva_fkey" FOREIGN KEY ("id_reserva") REFERENCES "reserva"("id_reserva") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "temporada_reserva" ADD CONSTRAINT "temporada_reserva_id_temporada_fkey" FOREIGN KEY ("id_temporada") REFERENCES "temporada"("id_temporada") ON DELETE RESTRICT ON UPDATE CASCADE;
