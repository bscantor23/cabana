-- CreateTable
CREATE TABLE "rol" (
    "id_rol" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "descripcion" VARCHAR(100) NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rol_pkey" PRIMARY KEY ("id_rol")
);

-- CreateIndex
CREATE UNIQUE INDEX "rol_nombre_key" ON "rol"("nombre");

-- CreateTable
CREATE TABLE "tipo_documento" (
    "id_tipo_documento" SERIAL NOT NULL,
    "codigo" VARCHAR(10) NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tipo_documento_pkey" PRIMARY KEY ("id_tipo_documento")
);

-- CreateIndex
CREATE UNIQUE INDEX "tipo_documento_codigo_key" ON "tipo_documento"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "tipo_documento_nombre_key" ON "tipo_documento"("nombre");


-- CreateTable
CREATE TABLE "pais" (
    "id_pais" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pais_pkey" PRIMARY KEY ("id_pais")
);

-- CreateIndex
CREATE UNIQUE INDEX "pais_nombre_key" ON "pais"("nombre");

-- CreateTable
CREATE TABLE "usuario" (
    "id_usuario" VARCHAR(30) NOT NULL,
    "id_rol" INTEGER NOT NULL,
    "id_tipo_documento" INTEGER NOT NULL,
    "id_pais" INTEGER NOT NULL,
    "correo_electronico" VARCHAR(100) NOT NULL,
    "clave" VARCHAR(100) NOT NULL,
    "primer_nombre" VARCHAR(50) NOT NULL,
    "segundo_nombre" VARCHAR(50),
    "primer_apellido" VARCHAR(50) NOT NULL,
    "segundo_apellido" VARCHAR(50),
    "direccion_residencia" VARCHAR(200) NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_correo_electronico_key" ON "usuario"("correo_electronico");

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_id_rol_fkey" FOREIGN KEY ("id_rol") REFERENCES "rol"("id_rol") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_id_tipo_documento_fkey" FOREIGN KEY ("id_tipo_documento") REFERENCES "tipo_documento"("id_tipo_documento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_id_pais_fkey" FOREIGN KEY ("id_pais") REFERENCES "pais"("id_pais") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "usuario_telefono" (
    "id_usuario" VARCHAR(30) NOT NULL,
    "telefono" VARCHAR(30) NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuario_telefono_pkey" PRIMARY KEY ("id_usuario","telefono")
);

-- AddForeignKey
ALTER TABLE "usuario_telefono" ADD CONSTRAINT "usuario_telefono_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;


-- CreateTable
CREATE TABLE "departamento" (
    "id_departamento" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "departamento_pkey" PRIMARY KEY ("id_departamento")
);

-- CreateTable
CREATE TABLE "ciudad" (
    "id_ciudad" SERIAL NOT NULL,
    "id_departamento" INTEGER NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ciudad_pkey" PRIMARY KEY ("id_ciudad")
);

-- AddForeignKey
ALTER TABLE "ciudad" ADD CONSTRAINT "ciudad_id_departamento_fkey" FOREIGN KEY ("id_departamento") REFERENCES "departamento"("id_departamento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "centro_poblado" (
    "id_centro_poblado" SERIAL NOT NULL,
    "id_ciudad" INTEGER NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "centro_poblado_pkey" PRIMARY KEY ("id_centro_poblado")
);

-- AddForeignKey
ALTER TABLE "centro_poblado" ADD CONSTRAINT "centro_poblado_id_ciudad_fkey" FOREIGN KEY ("id_ciudad") REFERENCES "ciudad"("id_ciudad") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "tipo_alojamiento" (
    "id_tipo_alojamiento" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tipo_alojamiento_pkey" PRIMARY KEY ("id_tipo_alojamiento")
);

-- CreateIndex
CREATE UNIQUE INDEX "tipo_alojamiento_nombre_key" ON "tipo_alojamiento"("nombre");

-- CreateTable
CREATE TABLE "alojamiento" (
    "id_alojamiento" SERIAL NOT NULL,
    "id_propietario" VARCHAR(30) NOT NULL,
    "id_tipo_alojamiento" INTEGER NOT NULL,
    "id_centro_poblado" INTEGER NOT NULL,
    "titulo" VARCHAR(100) NOT NULL,
    "descripcion" TEXT NOT NULL,
    "direccion_fisica" VARCHAR(200) NOT NULL,
    "valor_hospedaje" DECIMAL(10,2) NOT NULL,
    "cupo_persona" SMALLINT NOT NULL,
    "numero_habitaciones" SMALLINT NOT NULL,
    "numero_banos" SMALLINT NOT NULL,
    "tiene_calefaccion" BOOLEAN NOT NULL,
    "permite_mascotas" BOOLEAN NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "alojamiento_pkey" PRIMARY KEY ("id_alojamiento")
);

-- AddForeignKey
ALTER TABLE "alojamiento" ADD CONSTRAINT "alojamiento_id_propietario_fkey" FOREIGN KEY ("id_propietario") REFERENCES "usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alojamiento" ADD CONSTRAINT "alojamiento_id_tipo_alojamiento_fkey" FOREIGN KEY ("id_tipo_alojamiento") REFERENCES "tipo_alojamiento"("id_tipo_alojamiento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alojamiento" ADD CONSTRAINT "alojamiento_id_centro_poblado_fkey" FOREIGN KEY ("id_centro_poblado") REFERENCES "centro_poblado"("id_centro_poblado") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "fotografia_alojamiento" (
    "id_fotografia_alojamiento" SERIAL NOT NULL,
    "id_alojamiento" INTEGER NOT NULL,
    "descripcion" TEXT NOT NULL,
    "uri" VARCHAR(200) NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fotografia_alojamiento_pkey" PRIMARY KEY ("id_fotografia_alojamiento")
);

-- AddForeignKey
ALTER TABLE "fotografia_alojamiento" ADD CONSTRAINT "fotografia_alojamiento_id_alojamiento_fkey" FOREIGN KEY ("id_alojamiento") REFERENCES "alojamiento"("id_alojamiento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "reserva" (
    "id_reserva" SERIAL NOT NULL,
    "id_alojamiento" INTEGER NOT NULL,
    "id_arrendatario" VARCHAR(30) NOT NULL,
    "numero_personas" SMALLINT NOT NULL,
    "incluye_mascotas" BOOLEAN NOT NULL,
    "fecha_inicio" DATE NOT NULL,
    "fecha_fin" DATE NOT NULL,
    "valor_hospedaje" DECIMAL(10,2) DEFAULT 0,
    "valor_cancelado" DECIMAL(10,2) DEFAULT 0,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reserva_pkey" PRIMARY KEY ("id_reserva")
);

-- AddForeignKey
ALTER TABLE "reserva" ADD CONSTRAINT "reserva_id_alojamiento_fkey" FOREIGN KEY ("id_alojamiento") REFERENCES "alojamiento"("id_alojamiento") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reserva" ADD CONSTRAINT "reserva_id_arrendatario_fkey" FOREIGN KEY ("id_arrendatario") REFERENCES "usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "tipo_pago" (
    "id_tipo_pago" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tipo_pago_pkey" PRIMARY KEY ("id_tipo_pago")
);

-- CreateIndex
CREATE UNIQUE INDEX "tipo_pago_nombre_key" ON "tipo_pago"("nombre");

-- CreateTable
CREATE TABLE "pago_reserva" (
    "id_pago_reserva" SERIAL NOT NULL,
    "id_reserva" INTEGER NOT NULL,
    "id_tipo_pago" INTEGER NOT NULL,
    "fecha_historico" TIMESTAMP(3) NOT NULL,
    "valor_cancelado" DECIMAL(10,2) NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pago_reserva_pkey" PRIMARY KEY ("id_pago_reserva")
);

-- AddForeignKey
ALTER TABLE "pago_reserva" ADD CONSTRAINT "pago_reserva_id_reserva_fkey" FOREIGN KEY ("id_reserva") REFERENCES "reserva"("id_reserva") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pago_reserva" ADD CONSTRAINT "pago_reserva_id_tipo_pago_fkey" FOREIGN KEY ("id_tipo_pago") REFERENCES "tipo_pago"("id_tipo_pago") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "encuesta_reserva" (
    "id_encuesta_reserva" SERIAL NOT NULL,
    "id_reserva" INTEGER NOT NULL,
    "calificacion" SMALLINT NOT NULL,
    "comentario" TEXT NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "encuesta_reserva_pkey" PRIMARY KEY ("id_encuesta_reserva")
);

-- CreateIndex
CREATE UNIQUE INDEX "encuesta_reserva_id_reserva_key" ON "encuesta_reserva"("id_reserva");

-- AddForeignKey
ALTER TABLE "encuesta_reserva" ADD CONSTRAINT "encuesta_reserva_id_reserva_fkey" FOREIGN KEY ("id_reserva") REFERENCES "reserva"("id_reserva") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "temporada" (
    "id_temporada" SERIAL NOT NULL,
    "descripcion" VARCHAR(100) NOT NULL,
    "fecha_inicio" DATE NOT NULL,
    "fecha_fin" DATE NOT NULL,
    "porcentaje" DECIMAL(5,2) NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "temporada_pkey" PRIMARY KEY ("id_temporada")
);

-- CreateTable
CREATE TABLE "reserva_detalle" (
    "id_reserva_detalle" SERIAL NOT NULL,
    "id_reserva" INTEGER NOT NULL,
    "id_temporada" INTEGER,
    "fecha_inicio" DATE NOT NULL,
    "fecha_fin" DATE NOT NULL,
    "interes" DECIMAL(10,2) NOT NULL,
    "valor_unitario" DECIMAL(10,2) NOT NULL,
    "cantidad_dias" INTEGER NOT NULL,
    "valor_hospedaje" DECIMAL(10,2) NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fecha_actualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reserva_detalle_pkey" PRIMARY KEY ("id_reserva_detalle")
);

-- AddForeignKey
ALTER TABLE "reserva_detalle" ADD CONSTRAINT "reserva_detalle_id_reserva_fkey" FOREIGN KEY ("id_reserva") REFERENCES "reserva"("id_reserva") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reserva_detalle" ADD CONSTRAINT "reserva_detalle_id_temporada_fkey" FOREIGN KEY ("id_temporada") REFERENCES "temporada"("id_temporada") ON DELETE SET NULL ON UPDATE CASCADE;

-- SP para actualizar las reservas en base a los detalles de la reserva
-- Crear la función
CREATE OR REPLACE FUNCTION actualizar_valor_hospedaje_reserva()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE reserva
    SET valor_hospedaje = valor_hospedaje + NEW.valor_hospedaje
    WHERE id_reserva = NEW.id_reserva;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear el trigger
CREATE OR REPLACE TRIGGER actualizar_valor_hospedaje_reserva_trigger
AFTER INSERT ON reserva_detalle
FOR EACH ROW
EXECUTE FUNCTION actualizar_valor_hospedaje_reserva();

-- SP para actualizar el valor cancelado de la reserva en base a los pagos de la reserva
-- Crear la función
CREATE OR REPLACE FUNCTION actualizar_valor_cancelado()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE reserva
    SET valor_cancelado = valor_cancelado + NEW.valor_cancelado
    WHERE id_reserva = NEW.id_reserva;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear el trigger
CREATE OR REPLACE TRIGGER actualizar_valor_cancelado_trigger
AFTER INSERT ON pago_reserva
FOR EACH ROW
EXECUTE FUNCTION actualizar_valor_cancelado();

















