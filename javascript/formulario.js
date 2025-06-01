

async function addFormSubmitListener(formId, modalId) {
    const form = document.getElementById(formId);
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form); // NÃO converta para JSON

        try {
            const response = await fetch(form.action, {
                method: 'POST', // ou 'PUT' se for direto
                body: formData  // aqui vai com multipart/form-data automático
            });
            const data = await response.json();  

            if (data.sucesso) {
                localStorage.setItem('toastMessage', data.mensagem);
                localStorage.setItem('toastType', 'success');
                location.reload();
            } else {
                toastr.error(data.mensagem);
            }
            
            
        } catch (error) {
            console.error('Erro:', error);
        } finally{
            closeModal(modalId);
        }
    });
}

