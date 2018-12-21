/**
 * Dependencias internas
 */

/**
 * Dependencias de WordPress
 * Estas son unas dependencias básicas, rellenar con las que haga falta
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { InspectorControls, FontSizePicker, ColorPalette } = wp.editor;
const { PanelBody } = wp.components;

/**
 * Clase que define al componente "Inspector"
 */
class Inspector extends Component {
  /**
   * Constructor de la clase "Inspector"
   * @param {*} props Propiedades provenientes de la sección "edit" del bloque
   */
  constructor(props) {
    super(...arguments);
  }

  /**
   * Ejecución de este componente
   */
  render() {
    /**
     * Variables que se usan dentro del componente
     */
    const { attributes, isSelected, setAttributes } = this.props;

    /**
     * Funcionalidades del bloque, tales como actualización de atributos y demás
     */
    function setTextoSize(cambios) {
      const newTextoSize = cambios + "px";
      setAttributes({
        textoSize: newTextoSize
      });
    }

    function setTextoColor(cambios) {
      setAttributes({
        textoColor: cambios
      });
    }

    /**
     * Retorno del componente a la sección de "edit"
     */
    return (
      isSelected && (
        <Fragment>
          <InspectorControls>
            <PanelBody title={__("Configuración del texto")}>
              <FontSizePicker
                value={attributes.textoSize}
                onChange={setTextoSize}
              />
              <ColorPalette
                value={attributes.textoColor}
                onChange={setTextoColor}
              />
              <br />
            </PanelBody>
          </InspectorControls>
        </Fragment>
      )
    );
  }
}

/**
 * Como no exportemos el componente no funca
 */
export default Inspector;
