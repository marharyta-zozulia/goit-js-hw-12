import{a as l,S as u,i}from"./assets/vendor-LK6CqzKq.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&t(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const d="https://pixabay.com/api/",f="51408648-c1ffe0deedea697cddb1d0199";async function m(n){const o={key:f,q:n,image_type:"photo",orientation:"horizontal",safesearch:!0};return(await l.get(d,{params:o})).data}const y=document.querySelector(".gallery"),c=document.querySelector(".loader"),p=new u(".gallery a",{});function g(n){const o=document.querySelector(".gallery"),s=n.map(t=>`
      <li class="gallery-item">
        <a href="${t.largeImageURL}">
          <img src="${t.webformatURL}" alt="${t.tags}" />
        </a>
       <div class="info">
      <p>Likes: ${t.likes}</p>
      <p>Views: ${t.views}</p>
      <p>Comments: ${t.comments}</p>
      <p>Downloads: ${t.downloads}</p>
    </div>

      </li>
    `).join("");o.insertAdjacentHTML("beforeend",s),p.refresh()}function h(){y.innerHTML=""}function L(){c.classList.add("visible")}function w(){c.classList.remove("visible")}const b=document.querySelector(".form"),v=document.querySelector('input[name="search-text"]');b.addEventListener("submit",async n=>{n.preventDefault();const o=v.value.trim();if(!o){i.warning({message:"Please enter a search query."});return}h(),L();try{const s=await m(o),{hits:t}=s;t.length===0?i.info({message:"Sorry, there are no images matching your search query. Please try again!"}):g(t)}catch{i.error({message:"Something went wrong. Please try again later."})}finally{w()}});
//# sourceMappingURL=index.js.map
