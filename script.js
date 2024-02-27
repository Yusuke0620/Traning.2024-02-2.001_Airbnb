  /* 
  	#headerログインボタンのカーソルの移動に合わせて
  	グラデーションの薄い部分がついてくる効果 
  */
  const button = document.getElementById('gradient-button');

  button.addEventListener('mousemove', (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left; // ボタン内のX座標
    const y = e.clientY - rect.top; // ボタン内のY座標
  
    e.target.style.backgroundImage = `radial-gradient(circle at ${x}px ${y}px, 
      rgba(252, 53, 90, 1), 
      rgba(252, 255, 255, 0.1) 
      70%)`;
	  console.log('カーソル移動中');
  });
  
  document.getElementById('gradient-button').addEventListener('mouseleave', (e) => {
    e.target.style.backgroundImage = '';
	console.log('カーソルが要素から離れました');
  });
  /* --------------------------------------------------------------- */
  /*解説
   ①1行目のgetElementByIdでボタンを取得、
   addEventListenerで”マウスが要素内にある時に”第2引数で指定したアロー関数を実行する。
   ※mousemoveはマウスが要素内を移動している時に発生します。
   ②アロー関数の(e)は、イベントオブジェクト(マウスの位置、クリックされた要素など)を引数として受け取り、この情報を使い様々な操作を行う。
   ③mousemoveイベントが発生した際に、マウスが現在ある要素（button）のビューポートに対する相対的な位置やサイズの情報をgetBoundingClientRectメソッドを使って取得
   ④targetはマウスが移動しているその瞬間にポインター下にある要素、つまりこのイベントリスナーが設定されたbutton（IDがbuttonのボタン要素）を指します。

  clientXとclientYでマウスカーソルのページ全体に対する絶対位置（ビューポート基準）を取得しますが、これだけでは特定の要素内でのマウスの位置はわかりません。
  getBoundingClientRect()は、特定の要素がページ（ビューポート）のどの位置にあるかの情報を提供しますが、これも静的な情報であり、マウスの動きを追跡するものではありません。
  この二つの情報を組み合わせることで、特定の要素内でのマウスカーソルの相対位置を特定できます。具体的には、マウスカーソルの絶対位置（clientX、clientY）から、その要素のビューポートにおける位置（getBoundingClientRect()で得られるleft、top）を差し引くことにより、要素の左上角を原点とする座標系でのマウスカーソルの位置を計算します。この計算によって得られる数値は、要素内でのマウスの相対的な位置を示し、この位置情報を基に様々なインタラクティブな処理を実装できるわけです。

  まとめると、この一連のコードの目的は、特定の要素内でのマウスカーソルの相対位置をリアルタイムで追跡し、それに応じた動作（例えば、マウスの位置に基づくビジュアルエフェクトの適用など）を行うことにあります。
  */
  /* --------------------------------------------------------------- */



  /* 
  	つまみ移動でスライダーの色を灰色から黒色に変更する
  */
  document.addEventListener('DOMContentLoaded', () => {
 
    // 全てのレンジスライダーの要素を取得（必要に応じてセレクタを変更）
    const rangeSliders = document.querySelectorAll('input[type="range"]');
    // Track の元の色
    const baseColor = '#ddd';
    // Track のつまみの左側の部分の色
    const activeColor = '#222';
   
    // 取得したレンジスライダーの各要素に対して実行
    rangeSliders.forEach((slider) => {
      // input イベントのリスナーを設定
      slider.addEventListener('input', (e) => {
        // updateSlider を呼び出す
        updateSlider(e.target);
      });
      // updateSlider を実行して現在の値を反映
      updateSlider(slider);
    });
   
    // input イベントで呼び出される関数（トラックの塗りの範囲と色を設定する関数）
    function updateSlider(slider) {
      // max 属性の値が省略されている場合は100を設定
      if(!slider.max) {
        slider.max = 100;
      }
      // 現在の値から割合（%）を取得
      const progress = (slider.value / slider.max) * 100;
      // linear-gradient で Track の色を設定
      slider.style.background = `linear-gradient(to right, ${activeColor} ${progress}%, ${baseColor} ${progress}%)`;
    }   
  });
  /* --------------------------------------------------------------- */

  


  


document.addEventListener('DOMContentLoaded', () => {
    const accordions = document.querySelectorAll('.accordion-button');
  
    accordions.forEach(button => {
      button.addEventListener('click', () => {
        const accordionContent = button.nextElementSibling;
  
        button.classList.toggle('active');
        if (button.classList.contains('active')) {
          accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
        } else {
          accordionContent.style.maxHeight = '0';
        }
      });
    });
  });
  






  const nightSlider = document.getElementById('nightSlider');
  const priceText = document.getElementById('priceText');
  const nightCount = document.getElementById('nightCount');
  const pricePerNight = 20170; // 1泊あたりの価格
  
  nightSlider.addEventListener('input', () => {
    // 宿泊数を取得
    const nights = nightSlider.value;
    // 価格と宿泊数を同期させる関数を呼び出す
    syncPrice(nights);
  });



  
  
  // 価格と宿泊数を同期させる関数
  const syncPrice = nights => {
    nightCount.textContent = `1泊あたりの予想ホスティング収入¥ ${formatPrice(pricePerNight)}で${nights}泊`;
    const totalPrice = nights * pricePerNight;
    rotatePrice(totalPrice);
  };
  
  function rotatePrice(targetPrice) {
    const numbers = ["9", "8", "7", "6", "5", "4", "3", "2", "1", "0"];
    let i = 0;
    const interval = setInterval(() => {
      priceText.textContent = `¥ ${numbers[i]}${numbers[(i + 1) % 10]}${numbers[(i + 2) % 10]},${numbers[(i + 3) % 10]}${numbers[(i + 4) % 10]}0`;
      i++;
      if (i === numbers.length) {
        clearInterval(interval);
        // 最終的な価格を設定する
        const formattedPrice = formatPrice(targetPrice);
        priceText.textContent = `¥ ${formattedPrice}`;
      }
    }, 100); // 数字の更新速度を調整可能
  }
  
  const formatPrice = price => {
    return price.toLocaleString();
  };
  



  
  