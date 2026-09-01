import '../../styles/pagination.css';

function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}) {
    if (totalPages <= 1) {
        return null;
    }

    const pages = Array.from(
        { length: totalPages },
        (_, index) => index + 1
    );

    return (
        <div className="pagination">
            <button
                type="button"
                className="pagination-button"
                onClick={() =>
                    onPageChange(currentPage - 1)
                }
                disabled={currentPage === 1}
            >
                Anterior
            </button>

            <div className="pagination-pages">
                {pages.map((page) => (
                    <button
                        key={page}
                        type="button"
                        className={
                            page === currentPage
                                ? 'pagination-number active'
                                : 'pagination-number'
                        }
                        onClick={() =>
                            onPageChange(page)
                        }
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                type="button"
                className="pagination-button"
                onClick={() =>
                    onPageChange(currentPage + 1)
                }
                disabled={
                    currentPage === totalPages
                }
            >
                Siguiente
            </button>

            <span className="pagination-info">
                Página {currentPage} de {totalPages}
            </span>
        </div>
    );
}

export default Pagination;