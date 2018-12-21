/**
 * Dependencias internas
 */
import Controles from "./components/controles";
import Inspector from "./components/inspector";
import Functions from "./../../utils/functions";
import "./styles/style.scss";
import "./styles/editor.scss";

/**
 * Dependencias de WordPress
 * Estas son unas dependencias básicas, rellenar con las que haga falta
 */
const { __ } = wp.i18n;
const { Fragment } = wp.element;
const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;

/**
 * Atributos del bloque
 */
const atributosBloque = {
  texto: {
    type: "array",
    source: "children",
    selector: "#texto",
    default: Functions.holaMundo()
  },
  textoSize: {
    type: "string",
    default: "16px"
  },
  textoColor: {
    type: "string",
    default: "#181818"
  },
  textoSubrayado: {
    type: "boolean",
    default: false
  }
};

/**
 * Nombre: Texto completo
 * Slug: mwm-bloque-base
 * Descripción: Bloque de ejemplo para empezar a programar bloques
 */
registerBlockType("mwm-bloque-base/texto-completo", {
  /**
   * Configuración básica del bloque
   */
  title: __("Texto completo"),
  icon: "editor-textcolor",
  category: "common",
  attributes: atributosBloque,

  /**
   * Sección del bloque que se muestra en el editor (back-end)
   */
  edit(props) {
    /**
     * Variables que se usan dentro de la sección de edición
     */
    const { attributes, setAttributes } = props;

    /**
     * Funcionalidades del bloque, tales como actualización de atributos y demás
     */
    function onChangeTexto(cambios) {
      setAttributes({ texto: cambios });
    }

    /**
     * Retornamos al back-end la visualización del editor del bloque
     */
    return (
      <Fragment>
        {/* Controles de bloque e inspector general */}
        <Controles {...props} />
        <Inspector {...props} />

        {/* Contenido del bloque */}
        <div class="mwm-bloque-texto-completo">
          <p>
            {attributes.textoSubrayado ? (
              <RichText
                tagName="span"
                value={attributes.texto}
                onChange={onChangeTexto}
                placeholder="Texto de ejemplo"
                style={{
                  fontSize: attributes.textoSize,
                  color: attributes.textoColor,
                  backgroundColor: "#F5D22C"
                }}
              />
            ) : (
              <RichText
                tagName="span"
                value={attributes.texto}
                onChange={onChangeTexto}
                placeholder="Texto de ejemplo"
                style={{
                  fontSize: attributes.textoSize,
                  color: attributes.textoColor
                }}
              />
            )}
          </p>
        </div>
      </Fragment>
    );
  },

  /**
   * Sección del bloque que se muestra en la parte pública de la web (front-end)
   */
  save(props) {
    /**
     * Variables que se usan dentro de la sección pública
     */
    const { attributes } = props;

    /**
     * Funcionalidades del bloque, tales como actualización de atributos y demás
     */

    /**
     * Retornamos al front-end la visualización de la parte visual del bloque
     */
    return (
      // Contenido del bloque
      <div class="mwm-bloque-texto-completo">
        {attributes.texto && (
          <p>
            {attributes.textoSubrayado ? (
              <span
                id="texto"
                style={{
                  fontSize: attributes.textoSize,
                  color: attributes.textoColor,
                  backgroundColor: "#F5D22C"
                }}
              >
                {attributes.texto}
              </span>
            ) : (
              <span
                id="texto"
                style={{
                  fontSize: attributes.textoSize,
                  color: attributes.textoColor
                }}
              >
                {attributes.texto}
              </span>
            )}
          </p>
        )}
      </div>
    );
  }
});
