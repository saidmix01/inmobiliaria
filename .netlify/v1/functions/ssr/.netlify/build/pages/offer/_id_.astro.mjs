import { c as createComponent, d as createAstro, m as maybeRenderHead, i as renderComponent, r as renderTemplate } from '../../chunks/astro/server_CD0p8EJo.mjs';
import 'kleur/colors';
/* empty css                                    */
import { mergeProps, ref, onMounted, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _export_sfc } from '../../chunks/_plugin-vue_export-helper_pcqpp-6-.mjs';
export { renderers } from '../../renderers.mjs';

const _sfc_main = {
  __name: "OfferForm",
  setup(__props, { expose: __expose }) {
    __expose();
    const apiUrl = "https://inmobiliariabackend-cxa2eegkg0dpdjcs.centralus-01.azurewebsites.net";
    const propertyId = ref("");
    const property = ref(null);
    const loading = ref(true);
    const error = ref(null);
    const success = ref("");
    const submitError = ref("");
    const identificacionRef = ref(null);
    const certificadoRef = ref(null);
    const form = ref({
      documentId: "",
      fullName: "",
      address: "",
      phone: "",
      email: "",
      offerValue: ""
    });
    const fetchProperty = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/properties/get_properties_by_id`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ property_id: propertyId.value })
        });
        const data = await res.json();
        if (!data.status) throw new Error(data.message);
        property.value = data.data;
      } catch (err) {
        error.value = "No se pudo cargar el inmueble.";
      } finally {
        loading.value = false;
      }
    };
    const submitOffer = async () => {
      success.value = "";
      submitError.value = "";
      const fd = new FormData();
      fd.append("propertyId", propertyId.value);
      fd.append("documentId", form.value.documentId);
      fd.append("fullName", form.value.fullName);
      fd.append("address", form.value.address);
      fd.append("phone", form.value.phone);
      fd.append("email", form.value.email);
      fd.append("offerValue", form.value.offerValue);
      fd.append("identificacion", identificacionRef.value.files[0]);
      fd.append("certificado_ingresos", certificadoRef.value.files[0]);
      try {
        const res = await fetch(`${apiUrl}/api/offer/create_offer`, {
          method: "POST",
          body: fd
        });
        const data = await res.json();
        if (data.status) {
          success.value = "Oferta enviada exitosamente.";
        } else {
          throw new Error(data.message);
        }
      } catch (err) {
        submitError.value = err.message || "Error al enviar la oferta.";
      }
    };
    onMounted(() => {
      const url = window.location.pathname;
      const parts = url.split("/");
      propertyId.value = parts[parts.length - 1];
      console.log("📦 ID desde URL:", propertyId.value);
      if (propertyId.value) {
        fetchProperty();
      } else {
        error.value = "No se recibió el ID del inmueble.";
        loading.value = false;
      }
    });
    const __returned__ = { apiUrl, propertyId, property, loading, error, success, submitError, identificacionRef, certificadoRef, form, fetchProperty, submitOffer, ref, onMounted };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($setup.loading) {
    _push(`<div${ssrRenderAttrs(mergeProps({ class: "text-center" }, _attrs))}>Cargando inmueble...</div>`);
  } else if ($setup.error) {
    _push(`<div${ssrRenderAttrs(mergeProps({ class: "alert alert-danger" }, _attrs))}>${ssrInterpolate($setup.error)}</div>`);
  } else {
    _push(`<div${ssrRenderAttrs(_attrs)}><h2 class="mb-4">Aplicar oferta para: ${ssrInterpolate($setup.property.address)}</h2><div class="mb-4"><img${ssrRenderAttr("src", $setup.property.image_url)} class="img-fluid rounded shadow-sm" alt="Imagen del inmueble" style="${ssrRenderStyle({ "max-height": "300px", "object-fit": "cover" })}"><p class="mt-2"><strong>Área:</strong> ${ssrInterpolate($setup.property.area)} m²</p><p><strong>Precio:</strong> $${ssrInterpolate($setup.property.price)}</p></div><form enctype="multipart/form-data"><div class="row"><div class="col-md-6 mb-3"><label class="form-label">Número de documento</label><input${ssrRenderAttr("value", $setup.form.documentId)} type="text" class="form-control" required></div><div class="col-md-6 mb-3"><label class="form-label">Nombre completo</label><input${ssrRenderAttr("value", $setup.form.fullName)} type="text" class="form-control" required></div><div class="col-md-6 mb-3"><label class="form-label">Dirección</label><input${ssrRenderAttr("value", $setup.form.address)} type="text" class="form-control" required></div><div class="col-md-6 mb-3"><label class="form-label">Teléfono</label><input${ssrRenderAttr("value", $setup.form.phone)} type="text" class="form-control" required></div><div class="col-md-6 mb-3"><label class="form-label">Correo electrónico</label><input${ssrRenderAttr("value", $setup.form.email)} type="email" class="form-control" required></div><div class="col-md-6 mb-3"><label class="form-label">Valor ofertado</label><input${ssrRenderAttr("value", $setup.form.offerValue)} type="number" class="form-control" required></div><div class="col-md-6 mb-3"><label class="form-label">PDF de identificación</label><input type="file" accept="application/pdf" class="form-control" required></div><div class="col-md-6 mb-3"><label class="form-label">Certificado de ingresos</label><input type="file" accept="application/pdf" class="form-control" required></div></div><button type="submit" class="btn btn-success">Enviar oferta</button>`);
    if ($setup.success) {
      _push(`<div class="alert alert-success mt-3">${ssrInterpolate($setup.success)}</div>`);
    } else {
      _push(`<!---->`);
    }
    if ($setup.submitError) {
      _push(`<div class="alert alert-danger mt-3">${ssrInterpolate($setup.submitError)}</div>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</form></div>`);
  }
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/OfferForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const OfferForm = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

const $$Astro = createAstro();
const prerender = false;
const $$id = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  return renderTemplate`${maybeRenderHead()}<main class="container my-5"> ${renderComponent($$result, "OfferForm", OfferForm, { ":propertyId": "`${id}`", "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/Desktop/prueba tecnica/inmobiliaria/src/components/OfferForm.vue", "client:component-export": "default" })} </main>`;
}, "D:/Desktop/prueba tecnica/inmobiliaria/src/pages/offer/[id].astro", void 0);

const $$file = "D:/Desktop/prueba tecnica/inmobiliaria/src/pages/offer/[id].astro";
const $$url = "/offer/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
