import { c as createComponent, i as renderComponent, r as renderTemplate } from '../chunks/astro/server_CD0p8EJo.mjs';
import 'kleur/colors';
import { mergeProps, ref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from '../chunks/_plugin-vue_export-helper_pcqpp-6-.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const _sfc_main = {
  __name: "LoginForm",
  setup(__props, { expose: __expose }) {
    __expose();
    const apiUrl = "https://inmobiliariabackend-cxa2eegkg0dpdjcs.centralus-01.azurewebsites.net";
    const email = ref("");
    const password = ref("");
    const error = ref("");
    const handleLogin = async () => {
      error.value = "";
      try {
        const res = await fetch(`${apiUrl}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.value, password: password.value })
        });
        const data = await res.json();
        if (!data.status) {
          error.value = data.message || "Error al iniciar sesión";
        } else {
          localStorage.setItem("token", data.token);
          window.location.href = "/admin";
        }
      } catch (err) {
        error.value = "No se pudo conectar con el servidor";
      }
    };
    const __returned__ = { apiUrl, email, password, error, handleLogin, ref };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-vh-100 d-flex align-items-center justify-content-center bg-light" }, _attrs))}><div class="card shadow p-4" style="${ssrRenderStyle({ "max-width": "400px", "width": "100%" })}"><h2 class="text-center mb-4">Iniciar sesión</h2><form><div class="mb-3"><label class="form-label">Correo</label><input${ssrRenderAttr("value", $setup.email)} type="email" class="form-control" placeholder="tu@correo.com" required></div><div class="mb-3"><label class="form-label">Contraseña</label><input${ssrRenderAttr("value", $setup.password)} type="password" class="form-control" placeholder="••••••" required></div><button type="submit" class="btn btn-primary w-100"><i class="bi bi-box-arrow-in-right me-2"></i> Entrar </button>`);
  if ($setup.error) {
    _push(`<div class="alert alert-danger mt-3 text-center">${ssrInterpolate($setup.error)}</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</form></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/LoginForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const LoginForm = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

const $$Login = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "LoginForm", LoginForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/Desktop/prueba tecnica/inmobiliaria/src/components/LoginForm.vue", "client:component-export": "default" })}`;
}, "D:/Desktop/prueba tecnica/inmobiliaria/src/pages/login.astro", void 0);

const $$file = "D:/Desktop/prueba tecnica/inmobiliaria/src/pages/login.astro";
const $$url = "/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
