import { c as createComponent, r as renderTemplate, a as renderComponent, b as renderHead } from '../chunks/astro/server_AN8NM7U5.mjs';
import 'kleur/colors';
/* empty css                                 */
/* empty css                                 */
import { ref, onMounted, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _export_sfc } from '../chunks/_plugin-vue_export-helper_pcqpp-6-.mjs';
export { renderers } from '../renderers.mjs';

const _sfc_main = {
  __name: "InmuebleList",
  setup(__props, { expose: __expose }) {
    __expose();
    const apiUrl = "https://inmobiliariabackend-cxa2eegkg0dpdjcs.centralus-01.azurewebsites.net";
    const properties = ref([]);
    const propertyChunks = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const selected = ref(null);
    let modalInstance = null;
    const chunkArray = (array, size) => {
      const result = [];
      for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
      }
      return result;
    };
    const fetchProperties = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/properties/get_properties`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "all" })
        });
        const data = await res.json();
        if (!data.status) throw new Error(data.message || "Error al cargar inmuebles");
        properties.value = data.data;
        propertyChunks.value = chunkArray(data.data, 2);
      } catch (err) {
        error.value = err.message;
      } finally {
        loading.value = false;
      }
    };
    const openModal = (property) => {
      selected.value = property;
      const modalEl = document.getElementById("propertyModal");
      modalInstance = bootstrap.Modal.getOrCreateInstance(modalEl);
      modalInstance.show();
    };
    onMounted(fetchProperties);
    const __returned__ = { apiUrl, properties, propertyChunks, loading, error, selected, get modalInstance() {
      return modalInstance;
    }, set modalInstance(v) {
      modalInstance = v;
    }, chunkArray, fetchProperties, openModal, ref, onMounted };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  if ($setup.loading) {
    _push(`<div class="text-center">Cargando inmuebles...</div>`);
  } else if ($setup.error) {
    _push(`<div class="alert alert-danger">${ssrInterpolate($setup.error)}</div>`);
  } else {
    _push(`<div><div id="carouselInmuebles" class="carousel slide" data-bs-ride="carousel"><div class="carousel-inner"><!--[-->`);
    ssrRenderList($setup.propertyChunks, (chunk, index) => {
      _push(`<div class="${ssrRenderClass([{ active: index === 0 }, "carousel-item"])}"><div class="row justify-content-center"><!--[-->`);
      ssrRenderList(chunk, (property) => {
        _push(`<div class="col-md-4 mb-3"><div class="card h-100 shadow">`);
        if (property.image_url) {
          _push(`<img${ssrRenderAttr("src", property.image_url)} class="card-img-top" style="${ssrRenderStyle({ "height": "200px", "object-fit": "cover" })}" alt="Imagen del inmueble">`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="card-body d-flex flex-column"><h5 class="card-title">${ssrInterpolate(property.address)}</h5><p class="card-text mb-1"><strong>Área:</strong> ${ssrInterpolate(property.area)} m²</p><p class="card-text mb-1"><strong>Habitaciones:</strong> ${ssrInterpolate(property.rooms)}</p><p class="card-text mb-1"><strong>Baños:</strong> ${ssrInterpolate(property.bathrooms)}</p><p class="card-text mb-1"><strong>Precio:</strong> $${ssrInterpolate(property.price)}</p><button class="btn btn-primary mt-3 w-100"> Ver detalle </button></div></div></div>`);
      });
      _push(`<!--]--></div></div>`);
    });
    _push(`<!--]--></div><button class="carousel-control-prev" type="button" data-bs-target="#carouselInmuebles" data-bs-slide="prev"><i class="bi bi-chevron-left fs-2 text-dark bg-white p-2 rounded-circle"></i><span class="visually-hidden">Anterior</span></button><button class="carousel-control-next" type="button" data-bs-target="#carouselInmuebles" data-bs-slide="next"><i class="bi bi-chevron-right fs-2 text-dark bg-white p-2 rounded-circle"></i><span class="visually-hidden">Siguiente</span></button></div></div>`);
  }
  _push(`<div class="modal fade" id="propertyModal" tabindex="-1" aria-labelledby="propertyModalLabel" aria-hidden="true"><div class="modal-dialog modal-dialog-centered modal-lg">`);
  if ($setup.selected) {
    _push(`<div class="modal-content"><div class="modal-header"><h5 class="modal-title">${ssrInterpolate($setup.selected.address)}</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body">`);
    if ($setup.selected.image_url) {
      _push(`<img${ssrRenderAttr("src", $setup.selected.image_url)} class="img-fluid mb-3" style="${ssrRenderStyle({ "max-height": "300px", "object-fit": "cover" })}">`);
    } else {
      _push(`<!---->`);
    }
    _push(`<p><strong>Área:</strong> ${ssrInterpolate($setup.selected.area)} m²</p><p><strong>Habitaciones:</strong> ${ssrInterpolate($setup.selected.rooms)}</p><p><strong>Baños:</strong> ${ssrInterpolate($setup.selected.bathrooms)}</p><p><strong>Parqueaderos:</strong> ${ssrInterpolate($setup.selected.parkingSpaces)}</p><p><strong>Precio:</strong> $${ssrInterpolate($setup.selected.price)}</p><p><strong>Tipo de oferta:</strong> ${ssrInterpolate($setup.selected.offer_type)}</p></div><div class="modal-footer"><a${ssrRenderAttr("href", `/offer/${$setup.selected.id}`)} class="btn btn-success">Aplicar oferta</a><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button></div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/InmuebleList.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const InmuebleList = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Properties = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(['<html lang="es"> <head><meta charset="UTF-8"><title>Inmuebles disponibles</title><script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" defer><\/script>', '</head> <body> <main class="container my-5"> <h1 class="mb-4 text-center">Inmuebles disponibles</h1> ', " </main> </body></html>"])), renderHead(), renderComponent($$result, "InmuebleList", InmuebleList, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/Desktop/prueba tecnica/inmobiliaria/src/components/InmuebleList.vue", "client:component-export": "default" }));
}, "D:/Desktop/prueba tecnica/inmobiliaria/src/pages/properties.astro", void 0);

const $$file = "D:/Desktop/prueba tecnica/inmobiliaria/src/pages/properties.astro";
const $$url = "/properties";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Properties,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
