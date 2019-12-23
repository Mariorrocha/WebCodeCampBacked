
/*Creacion de la tabla de conferencistas*/
CREATE TABLE conferencistas(
    id_conf INT(11) NOT NULL,
    nombre_conf VARCHAR(100) NOT NULL,
    description VARCHAR(200)
);

ALTER TABLE conferencistas
ADD PRIMARY KEY (id_conf);

ALTER TABLE conferencistas
MODIFY id_conf INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;


/*Creacion de la tabla de eventos*/
CREATE TABLE eventos(
    id_evento INT(11) NOT NULL,
    nombre_evento VARCHAR(100) NOT NULL,
    idioma VARCHAR(100),
    fecha_evento DATE,
    fecha_creacion DATE,
    id_conf INT NOT NULL,
    precio NUMERIC NOT NULL,
    lugar_evento VARCHAR(100) NOT NULL,
    hora_evento VARCHAR(50),
    CONSTRAINT fk_conf FOREIGN KEY (id_conf) REFERENCES conferencistas(id_conf)
);

ALTER TABLE eventos
ADD PRIMARY KEY (id_evento);

ALTER TABLE eventos
MODIFY id_evento INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

/*ALTER TABLE eventos
ADD hora_evento VARCHAR(50);*/


/*Inserta datos en la tabla de conferencistas*/
INSERT INTO conferencistas(nombre_conf, description) VALUES('Mario Ramirez','Desarrollo Javascript');
INSERT INTO conferencistas(nombre_conf, description) VALUES('Adrian Bd','Desarrollo Python');
INSERT INTO conferencistas(nombre_conf, description) VALUES('Lupe Villanueva','Desarrollo NodeJs');


/*Inserta datos en la tabla de eventos*/
INSERT INTO eventos(nombre_evento, idioma, fecha_evento, fecha_creacion,id_conf,precio, lugar_evento) 
VALUES('Principios de Javascript','Español','2019-12-26', CURDATE(),1,2000,'20 Alvaro Abregon CDMX');

INSERT INTO eventos(nombre_evento, idioma, fecha_evento, fecha_creacion,id_conf,precio, lugar_evento) 
VALUES('DJango','Español','2020-01-10', CURDATE(),2,2500,'165 Insurgentes sur CDMX');

INSERT INTO eventos(nombre_evento, idioma, fecha_evento, fecha_creacion,id_conf,precio, lugar_evento) 
VALUES('Express','Español','2020-02-5', CURDATE(),3,3000,'12 Av Zapogan Guadalajara');


/*Creacion del Stored Procedur para crear y actualizar el evento*/
CREATE DEFINER=`root`@`localhost` PROCEDURE `eventosAddOrEdit`(
	IN _id_evento INT,
    IN _nombre_evento VARCHAR(100),
    IN _idioma VARCHAR(100),
    IN _fecha_evento DATE,
    IN _fecha_creacion DATE,
    IN _id_conf INT,
    IN _precio NUMERIC,
    IN _lugar_evento VARCHAR(100),
    IN _hora_evento VARCHAR(60)
)
BEGIN
	IF _id_evento = 0 THEN
		INSERT INTO eventos(nombre_evento, idioma, fecha_evento, fecha_creacion,id_conf,precio, lugar_evento, hora_evento) 
		VALUES(_nombre_evento,_idioma,_fecha_evento, CURDATE(),_id_conf,_precio,_lugar_evento, _hora_evento);
        
        SET _id_evento = LAST_INSERT_ID();
	ELSE
		UPDATE eventos
		SET nombre_evento =_nombre_evento,
			idioma = _idioma,
			fecha_evento = _fecha_evento,
			fecha_creacion = CURDATE(),
			id_conf = _id_conf,
			precio = _precio,
			lugar_evento = _lugar_evento,
            hora_evento = _hora_evento
		WHERE id_evento = _id_evento;
	END IF;
    
    SELECT _id_evento AS id_evento;
END

