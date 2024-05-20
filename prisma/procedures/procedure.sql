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