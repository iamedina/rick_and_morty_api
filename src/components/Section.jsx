import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Contenido() {
    const [personajes, setPersonajes] = useState([]);
    const [nombre, setNombre] = useState('');
    const [estado, setEstado] = useState('');
    const [filtros, setFiltros] = useState({ nombre: '', estado: '' });
    const [paginaActual, setPaginaActual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);

    const buscar = () => {
        setPaginaActual(1);
        setFiltros({ nombre, estado });
    }

    useEffect(() => {
        fetch(`https://rickandmortyapi.com/api/character/?page=${paginaActual}&name=${filtros.nombre}&status=${filtros.estado}`)
            .then(response => response.json())
            .then(data => {
                setPersonajes(data.results ?? [])
                setTotalPaginas(data.info?.pages ?? 1)
            })
    }, [paginaActual, filtros]);

    const cambiarPagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);
    window.scrollTo({ top: 0, behavior: "smooth" });
};


    return (
        <section className="section-cards">
            <section className="buscador flex justify-center" onKeyDown={(e) => { if (e.key === 'Enter') buscar(); }}>
                <div className="input-group">
                    <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} id="name" placeholder="Ingrese el nombre" />
                </div>
                <div className="input-group">
                    <input type="text" value={estado} onChange={(e) => setEstado(e.target.value)} id="status" placeholder="Ingrese el estado" />
                </div>
                <button id="buscar" type="button" onClick={buscar}>
                    Buscar
                </button>
            </section>
            <div id="div-cards">
                {
                    personajes && personajes.map(
                        items => (
                            <article key={items.id} className="cards">
                                <div className="imgCard">
                                    <img src={items.image} />
                                </div>
                                <div className="infoCard">
                                    <div className="section">
                                        <a href="https://rickandmortyapi.com/api/character/?id=${items.name}" target="blank">
                                            <h2>{items.name}</h2>
                                        </a>
                                        <span className="status">
                                            <span className={
                                                items.status === "Alive"
                                                    ? "status-green"
                                                    : items.status === "Dead"
                                                        ? "status-red"
                                                        : "status-gray"
                                            }></span>
                                            {items.status} - {items.species}
                                        </span>
                                    </div><br></br>
                                    <div className="section">
                                        <span className="text-gray">
                                            Last known location: <br></br>
                                        </span>
                                        <a href="#" className="location-a">
                                            {items.origin.name}
                                        </a>
                                    </div><br></br>
                                    <div className="section">
                                        <span className="text-gray">
                                            First seen in: <br></br>
                                        </span>
                                        <a href="#">
                                            {items.location.name}
                                        </a>
                                    </div>
                                </div>
                            </article>
                        )
                    )
                }
            </div>

            <div className="botones">
                <button onClick={() => cambiarPagina(paginaActual - 1)} disabled={paginaActual === 1}>
                    <ChevronLeft size={20} />
                </button>
                <div className="numeros-paginas" style={{ display: "flex", gap: "10px" }}>
                    <button
                        onClick={() => cambiarPagina(1)}
                        className={paginaActual === 1 ? "pagina-actual" : ""}
                        style={{
                            fontWeight: paginaActual === 1 ? "bold" : "normal",
                            border: "none",
                            cursor: "pointer",
                            width: '15px'
                        }}
                    >
                        1
                    </button>
                    {paginaActual !== 1 && paginaActual !== totalPaginas && (
                        <button
                            className="pagina-actual"
                            style={{
                                fontWeight: "bold",
                                border: "none",
                                cursor: "pointer",
                                 width: '15px'
                            }}
                            disabled
                        >
                            {paginaActual}
                        </button>
                    )}
                    {paginaActual < totalPaginas - 1 && totalPaginas > 2 && <span style={{color: 'white', display: 'flex', alignItems: 'flex-end'}}>...</span>}
                    {totalPaginas > 1 && (
                        <button
                            onClick={() => cambiarPagina(totalPaginas)}
                            className={paginaActual === totalPaginas ? "pagina-actual" : ""}
                            style={{
                                fontWeight: paginaActual === totalPaginas ? "bold" : "normal",
                                border: "none",
                                cursor: "pointer",
                                width: '15px'
                            }}
                        >
                            {totalPaginas}
                        </button>
                    )}
                </div>
                <button onClick={() => cambiarPagina(paginaActual + 1)} disabled={paginaActual === totalPaginas}>
                    <ChevronRight size={20} />
                </button>
            </div>
        </section>
    );
}

export default Contenido