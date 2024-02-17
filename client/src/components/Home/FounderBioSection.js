import styles from './FounderBioSection.module.css';

const FounderBioSection = () => {
  return (
    <section className={styles['founder-bio']}>
      <h3 className={styles['founder-title']}>El Fundador</h3>
      <div className={styles['founder-content']}>
        <img
          src="https://res.cloudinary.com/dhnhzlu0g/image/upload/v1701039873/liberty-nutrition-system/home-images/Adolfo-Sr_iqo7pt.jpg"
          alt="Founder"
        />
      </div>
      <div className={styles['founder-text']}>
        <article>
          Nacido en Cuba, su Madre Isabel Salazar y Padre Adolfo Gonzalez. Se
          Casa y tiene tres hijos, Isabel, Adolfo y Concepción. Llega a los
          Estados Unidos en el Año 1969 con $25.00 en el bolsillo. Se instala en
          el Bronx y al dia siguiente comienza a trabajar en una bodega de
          ayudante y tiene otro trabajo en “delivery”. Pocos meses después se
          muda para Elizabeth, NJ. y comienza a trabajar en la “Fedders” en
          Edison y en un “Nursing Home”. Los fines de semana trabaja en el
          Restaurante de “Towne & Campus” limpiando platos. En el Año 1971,
          compra su primera casa en Irvington, NJ.. El siguiente año compra otra
          casa al frente de la que vivía.
          <br />
          <br />
          Un vendedor de seguros hace una cita para venderle al Sr. Gonzalez y
          el vendedor lo lleva a la compañia de Aetna. Comienza su carrera de
          ventas de seguros en el año 1973. Ese año recibe diversos galardones
          por su exito en ventas. En el año 1974, comienza a trabajar con
          "National Life", por 4 años consecutivos es el Mejor vendedor.
          <br />
          <br />
          En el año 1979, fue invitado a una reunión de “Rena-Ware” en New York
          y comienza a trabajar y en ese año fue el “Rookie Del Año Nacional” de
          la misma compañía. En 1980, se cambia a trabajar con “Future Craft
          Inc.” y recibe el cargo de “Manager”, con su primera oficina
          localizada en Elizabeth. En “Future Craft” abre 4 oficinas, Union
          City, Paterson, Queens y Elizabeth, por este trabajo es nombrado
          Vice-Presidente de la compañia “Future Craft” y recibe un “Lincoln”.
          Durante los años 1980-1984, es el vendedor #1 de “Future Craft” y su
          Organizacion es #1 igualmente.
          <br />
          <br />
          En el año 1984, comienza su carrera de Distribuidor con “Society
          Corp”. Se instala en 4911 Bergenline Ave. #14. En 1985, abre la
          oficina en 415 43rd St. Union City, tiene 3 “managers” trabajando con
          un grupo de 40 vendedores. Durante este tiempo la Sra. Minerva es #1
          en ventas para la Compañia “Society Spanish American, Inc” y mantiene
          este puesto por 9 años consecutivos.
          <br />
          <br />
          En 1990, transfiere las oficinas al 6402 Bergenline Ave. West New
          York. La Organización de “Society” ha crecido con 5 nuevas oficinas en
          el area de New York y New Jersey, en las reuniones se incorporan mas
          de 100 personas. En el año 1990, la compañia “Tri-state Water Filter
          Inc.” es establecida para la venta al por mayor de filtros Hurley. En
          el año 1991, la compañia cambia el nombre a “Liberty Home Products
          Inc.”. En el mismo año, patentiza un juego de ollas de 5 capas y
          tambien comienza la relación con la nueva fábrica de filtros
          Multi-Pure. La Compañia en el año 1995, comienza las ollas de 7 capas.
          En 1997, se establece una financiera, con el propósito de ayudar al
          Distribuidor en su crecimiento.
        </article>
      </div>
    </section>
  );
};

export default FounderBioSection;
