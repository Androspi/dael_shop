import { Modal, Offcanvas, Tab, Toast } from "bootstrap";

export class BootstrapUtilities {

    /**
     * Abre o cierra un modal de bootstrap
     * @param selector Selector html del modal
     */
    static toggleModal(selector: string, action: 'show' | 'hide') {
        /** Etiqueta del cuadro de diálogo a abrir */
        const element = document.querySelector(selector);

        if (!element) {
            console.error(`Modal ${selector} no existe`);
            return;
        }

        /** Instancia del modal */
        const instance = Modal.getOrCreateInstance(element);
        instance[action]();
    }

    /**
     * Abre o cierra un modal de bootstrap
     * @param selector Selector html del modal
     */
    static toggleCanvas(selector: string, action: 'show' | 'hide' | 'toggle') {
        /** Etiqueta del cuadro de diálogo a abrir */
        const element = document.querySelector(selector);

        if (!element) {
            console.error(`Offcanvas ${selector} no existe`);
            return;
        }

        /** Instancia del modal */
        const instance = Offcanvas.getOrCreateInstance(element);
        instance[action]();
    }

    /**
     * Abre o cierra un modal de bootstrap
     * @param selector Selector html del modal
     */
    static toggleToast(selector: string, action: 'show' | 'hide') {
        /** Etiqueta del cuadro de diálogo a abrir */
        const element = document.querySelector(selector);

        if (!element) {
            console.error(`Toast ${selector} no existe`);
            return;
        }

        /** Instancia del modal */
        const instance = Toast.getOrCreateInstance(element);
        instance[action]();
    }

    /**
     * Abre o cierra un modal de bootstrap
     * @param selector Selector html del modal
     */
    static activateTab(selector: string) {
        /** Etiqueta del cuadro de diálogo a abrir */
        const element = document.querySelector(selector);

        if (!element) {
            console.error(`Toast ${selector} no existe`);
            return;
        }

        /** Instancia del modal */
        const instance = Tab.getOrCreateInstance(element);
        instance.show();
    }

}
