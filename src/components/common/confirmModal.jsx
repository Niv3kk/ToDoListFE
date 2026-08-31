function ConfirmModal({
    title,
    message,
    onConfirm,
    onCancel,
    loading = false,
}) {
    return (
        <div className="modal-overlay">
            <div className="confirm-modal">
                <h2>{title}</h2>

                <p>{message}</p>

                <div className="modal-actions">
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        {loading ? 'Eliminando...' : 'Eliminar'}
                    </button>

                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;