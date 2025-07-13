import { c as createComponent, r as renderTemplate, a as renderComponent, b as renderHead } from '../chunks/astro/server_AN8NM7U5.mjs';
import 'kleur/colors';
import { ref, onMounted, useSSRContext } from 'vue';
import { ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from '../chunks/_plugin-vue_export-helper_pcqpp-6-.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const _sfc_main = {
  __name: "AdminDashboard",
  setup(__props, { expose: __expose }) {
    __expose();
    const logout = () => {
      localStorage.removeItem("token");
      window.location.href = "/login";
    };
    const offers = ref([]);
    const loading = ref(true);
    const error = ref(null);
    const selectedOffer = ref(null);
    const BASE_URL = `${"https://inmobiliariabackend-cxa2eegkg0dpdjcs.centralus-01.azurewebsites.net"}/api/offer`;
    let modalInstance = null;
    onMounted(() => {
      const modalEl = document.getElementById("offerModal");
      if (modalEl) {
        modalInstance = bootstrap.Modal.getOrCreateInstance(modalEl);
      }
      fetchOffers();
    });
    const fetchOffers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
        return;
      }
      try {
        const res = await fetch(`${BASE_URL}/admin/get_offers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-token": token
          }
        });
        const data = await res.json();
        if (!data.status) {
          throw new Error(data.message || "Error al obtener ofertas");
        }
        offers.value = data.data;
      } catch (err) {
        error.value = err.message;
      } finally {
        loading.value = false;
      }
    };
    const viewDetails = async (offerId) => {
      const token = localStorage.getItem("token");
      try {
        const res = await fetch(`${BASE_URL}/admin/get_offer_by_id`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-token": token
          },
          body: JSON.stringify({ offerId })
        });
        const data = await res.json();
        if (data.status) {
          selectedOffer.value = data.data;
          if (modalInstance) {
            modalInstance.show();
          }
        } else {
          alert(data.message);
        }
      } catch (err) {
        alert("Error al cargar detalles");
      }
    };
    const handleAction = async (offerId, action) => {
      const token = localStorage.getItem("token");
      const endpoint = action === "accept" ? "accept_offer" : action === "reject" ? "reject_offer" : null;
      if (!endpoint) return;
      try {
        const res = await fetch(`${BASE_URL}/admin/${endpoint}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-token": token
          },
          body: JSON.stringify({ offerId })
        });
        const data = await res.json();
        if (data.status) {
          fetchOffers();
          if (modalInstance) {
            modalInstance.hide();
          }
        } else {
          alert(data.message);
        }
      } catch (err) {
        alert("Error al procesar la acción");
      }
    };
    const __returned__ = { logout, offers, loading, error, selectedOffer, BASE_URL, get modalInstance() {
      return modalInstance;
    }, set modalInstance(v) {
      modalInstance = v;
    }, fetchOffers, viewDetails, handleAction, ref, onMounted };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<!--[--><div class="container mt-5"><div class="d-flex justify-content-between align-items-center mb-4"><h2>Panel de administración</h2><button class="btn btn-outline-danger"><i class="bi bi-box-arrow-right me-1"></i> Cerrar sesión </button></div>`);
  if ($setup.loading) {
    _push(`<div class="text-center">Cargando...</div>`);
  } else if ($setup.error) {
    _push(`<div class="alert alert-danger">${ssrInterpolate($setup.error)}</div>`);
  } else {
    _push(`<table class="table table-bordered"><thead><tr><th>#</th><th>Nombre</th><th>Email</th><th>Inmueble</th><th>Estado</th><th>Acciones</th></tr></thead><tbody><!--[-->`);
    ssrRenderList($setup.offers, (offer, index) => {
      _push(`<tr><td>${ssrInterpolate(index + 1)}</td><td>${ssrInterpolate(offer.fullName)}</td><td>${ssrInterpolate(offer.email)}</td><td>${ssrInterpolate(offer.Property?.address || "-")}</td><td><span class="${ssrRenderClass({
        "badge bg-secondary": offer.status === "pendiente",
        "badge bg-success": offer.status === "aceptada",
        "badge bg-danger": offer.status === "rechazada"
      })}">${ssrInterpolate(offer.status)}</span></td><td><button class="btn btn-outline-info btn-sm me-2"><i class="bi bi-eye"></i></button></td></tr>`);
    });
    _push(`<!--]--></tbody></table>`);
  }
  _push(`</div><div class="modal fade" id="offerModal" tabindex="-1" aria-labelledby="offerModalLabel" aria-hidden="true"><div class="modal-dialog modal-lg modal-dialog-centered">`);
  if ($setup.selectedOffer) {
    _push(`<div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="offerModalLabel">Detalle de la oferta</h5><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button></div><div class="modal-body"><p><strong>Nombre:</strong> ${ssrInterpolate($setup.selectedOffer.fullName)}</p><p><strong>Email:</strong> ${ssrInterpolate($setup.selectedOffer.email)}</p><p><strong>Teléfono:</strong> ${ssrInterpolate($setup.selectedOffer.phone)}</p><p><strong>Valor ofrecido:</strong> $${ssrInterpolate($setup.selectedOffer.offerValue)}</p><p><strong>Estado:</strong> ${ssrInterpolate($setup.selectedOffer.status)}</p><p><strong>Inmueble:</strong> ${ssrInterpolate($setup.selectedOffer.Property?.address || "Sin dirección")}</p>`);
    if ($setup.selectedOffer.OfferDocuments?.length) {
      _push(`<div><h5>Documentos</h5><ul><!--[-->`);
      ssrRenderList($setup.selectedOffer.OfferDocuments, (doc) => {
        _push(`<li><a${ssrRenderAttr("href", doc.fileUrl)} target="_blank">${ssrInterpolate(doc.type)}</a></li>`);
      });
      _push(`<!--]--></ul></div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div><div class="modal-footer"><button class="btn btn-success"${ssrIncludeBooleanAttr($setup.selectedOffer.status !== "pendiente") ? " disabled" : ""}> Aceptar </button><button class="btn btn-danger"${ssrIncludeBooleanAttr($setup.selectedOffer.status !== "pendiente") ? " disabled" : ""}> Rechazar </button><button type="button" class="btn btn-secondary" data-bs-dismiss="modal"> Cerrar </button></div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div></div><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/AdminDashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AdminDashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Admin = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(['<html lang="es"> <head><meta charset="UTF-8"><title>Panel Admin</title><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"><!-- \u2705 Bootstrap JS --><script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" defer><\/script>', "</head> <body> ", " </body></html>"])), renderHead(), renderComponent($$result, "AdminDashboard", AdminDashboard, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/Desktop/prueba tecnica/inmobiliaria/src/components/AdminDashboard.vue", "client:component-export": "default" }));
}, "D:/Desktop/prueba tecnica/inmobiliaria/src/pages/admin.astro", void 0);

const $$file = "D:/Desktop/prueba tecnica/inmobiliaria/src/pages/admin.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Admin,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
