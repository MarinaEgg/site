export default `
#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
uniform float time;
varying vec2 vUv;
varying vec3 newPosition;
varying float noise;
#include <common>
#include <packing>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <envmap_physical_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {
  #include <clipping_planes_fragment>
  
  // Couleur de base jaune dorée
  vec3 baseYellow = vec3(1.0, 0.843, 0.0); // #FFD700
  
  // Calcul de l'intensité basée sur le bruit et la position
  float noiseIntensity = 0.5 + 0.5 * noise; // Normalisation du bruit entre 0.5 et 1.0
  
  // Facteur de hauteur/position pour le dégradé (ajustez selon votre géométrie)
  float heightFactor = smoothstep(-1.0, 1.0, newPosition.y);
  
  // Combine bruit et position pour créer des zones de transition
  float transitionFactor = noiseIntensity * (0.3 + 0.7 * heightFactor);
  
  // Création du dégradé jaune vers blanc
  // Les zones avec plus de bruit et plus hautes deviennent blanches
  float whiteFactor = smoothstep(0.6, 0.9, transitionFactor);
  
  // Mélange entre jaune de base et blanc
  vec3 finalColor = mix(baseYellow, vec3(1.0, 1.0, 1.0), whiteFactor);
  
  // Ajout d'une légère variation de luminosité pour plus de dynamisme
  finalColor *= (0.9 + 0.1 * sin(time * 2.0 + noise * 10.0));
  
  // S'assurer que les valeurs restent dans la plage valide
  finalColor = clamp(finalColor, 0.0, 1.0);
  
  vec4 diffuseColor = vec4(diffuse, opacity);
  ReflectedLight reflectedLight = ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));
  vec3 totalEmissiveRadiance = emissive;
  
  #include <logdepthbuf_fragment>
  #include <map_fragment>
  #include <color_fragment>
  
  // Appliquer notre couleur personnalisée après les calculs de base
  diffuseColor.rgb *= finalColor;
  #include <alphamap_fragment>
  #include <alphatest_fragment>
  #include <specularmap_fragment>
  #include <normal_fragment_begin>
  #include <normal_fragment_maps>
  #include <emissivemap_fragment>
  #include <lights_phong_fragment>
  #include <lights_fragment_begin>
  #include <lights_fragment_maps>
  #include <lights_fragment_end>
  #include <aomap_fragment>
  
  vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
  
  #include <envmap_fragment>
  #include <premultiplied_alpha_fragment>
  #include <tonemapping_fragment>
  #include <encodings_fragment>
  #include <fog_fragment>
  
  gl_FragColor = vec4(outgoingLight, diffuseColor.a);
}
`;
