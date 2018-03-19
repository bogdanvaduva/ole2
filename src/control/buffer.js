import OL3Parser from '../../node_modules/jsts/org/locationtech/jts/io/OL3Parser';
import { BufferOp } from '../../node_modules/jsts/org/locationtech/jts/operation/buffer';
import Control from './control';
import delSVG from '../../img/delete.svg';

/**
 * Control for deleting geometries.
 * @extends {ole.Control}
 * @alias ole.BufferControl
 */
class BufferControl extends Control {
  /**
   * @inheritdoc
   * @param {Object} [options] Control options.
   * @param {ol.source.Vector} [source] vector to delete.
   * @param {boolean} [multi] select multiple if set to true
   *   (default is false).
   */
  constructor(options) {
    super(Object.assign({
      title: 'Buffer geometry',
      className: 'ole-control-buffer',
      image: delSVG,
    }, options));

    /**
     * @type {ol.interaction.Select}
     * @private
     */
    this.selectInteraction = new ol.interaction.Select({
      source: this.source,
      multi: typeof (options.multi) === 'undefined' ? true : options.multi,
    });

    this.dialogTemplate = `
      <label>Buffer width: &nbsp;<input type="text" id="buffer-width"/></label>
      <input type="button" value="OK" id="buffer-btn" />
    `;
  }

  /**
   * Apply a buffer for seleted features.
   * @param {Number} width Buffer width in map units.
   */
  buffer(width) {
    const parser = new OL3Parser();
    const features = this.selectInteraction.getFeatures().getArray();
    for (let i = 0; i < features.length; i += 1) {
      const jstsGeom = parser.read(features[i].getGeometry());
      const bo = new BufferOp(jstsGeom);
      const buffered = bo.getResultGeometry(width);
      features[i].setGeometry(parser.write(buffered));
    }
  }

  /**
   * @inheritdoc
   */
  activate() {
    this.map.addInteraction(this.selectInteraction);
    super.activate();

    document.getElementById('buffer-btn').addEventListener('click', () => {
      const input = document.getElementById('buffer-width');
      const width = parseInt(input.value, 10);

      if (width) {
        this.buffer(width);
      }
    });
  }

  /**
   * @inheritdoc
   */
  deactivate() {
    this.map.removeInteraction(this.selectInteraction);
    super.deactivate();
  }
}

export default BufferControl;
