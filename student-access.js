(function(){
  const GAME_ID = (location.pathname.split('/').pop() || '').replace('.html','');
  const code = (sessionStorage.getItem('arij_student_code') || '').trim().toUpperCase();
  const overlay = document.createElement('div');
  overlay.id='accessOverlay';
  overlay.innerHTML='<div class="accessBox"><div style="font-size:48px">🔒</div><h2>Bu oyuna erişim yok</h2><p>Bu oyun size atanmadı.</p><button onclick="location.href=\'../index.html\'">Ana Sayfaya Dön</button></div>';
  Object.assign(overlay.style,{position:'fixed',inset:'0',zIndex:'999999',display:'none',alignItems:'center',justifyContent:'center',background:'#f3f7fb',fontFamily:'Arial,sans-serif'});
  document.addEventListener('DOMContentLoaded', async function(){
    document.body.appendChild(overlay);
    if(!code || !window.supabaseClient){
      overlay.style.display='flex';
      return;
    }
    try{
      const {data,error}=await window.supabaseClient.rpc('get_student_access',{p_code:code});
      if(error) throw error;
      const allowed=(data||[]).some(r=>r.game_id===GAME_ID);
      if(!allowed) overlay.style.display='flex';
    }catch(e){
      console.error(e);
      overlay.style.display='flex';
    }
  });
})();
