/**
 * Dependencias internas
 */

/**
 * Dependencias de WordPress
 * Estas son unas dependencias básicas, rellenar con las que haga falta
 */
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;
const { BlockControls } = wp.editor;
const { Toolbar } = wp.components;

/**
 * Clase que define al componente "Controles"
 */
class Controles extends Component {
  /**
   * Constructor de la clase "Controles"
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

    /**
     * Todos los controles propios con sus funcionalidades
     */
    const customControls = [
      {
        icon: "admin-appearance",
        title: __("Subrayar texto"),
        onClick: () =>
          setAttributes({ textoSubrayado: !attributes.textoSubrayado }),
        isActive: attributes.textoSubrayado === true
      }
    ];

    /**
     * Retorno del componente a la sección de "edit"
     */
    return (
      isSelected && (
        <Fragment>
          <BlockControls>
            <Toolbar controls={customControls} />
          </BlockControls>
        </Fragment>
      )
    );
  }
}

/**
 * Como no exportemos el componente no funca
 */
export default Controles;
