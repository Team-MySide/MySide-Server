'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "d8535a7a4488a4d5dc509834469c67d2",
"splash/img/light-2x.png": "77d008a67dc534c46b32aad9955b6bf7",
"splash/img/light-3x.png": "e070542940e66192480c3abbb207bf8a",
"splash/img/dark-3x.png": "e070542940e66192480c3abbb207bf8a",
"splash/img/dark-2x.png": "77d008a67dc534c46b32aad9955b6bf7",
"splash/img/dark-1x.png": "89828dd77b4234ffe4148768799d27b0",
"splash/img/light-1x.png": "89828dd77b4234ffe4148768799d27b0",
"splash/style.css": "3310f8170d554be3ace57bc266ea7b5c",
"index.html": "259742646232f3feaf75c1bda8db79aa",
"/": "259742646232f3feaf75c1bda8db79aa",
"main.dart.js": "4454619d4dd3184087ce42f3d618c1b7",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "b63ad508345c4d14a2a4c097b292d1ef",
"assets/images/svg/stew.svg": "85ed107215c6663487ba38a6d82e34e1",
"assets/images/svg/like.svg": "9e9e257e7024af7d459b260ad1ab2c63",
"assets/images/svg/nudle.svg": "c5372396279b4000163eabd5150268d7",
"assets/images/svg/gogryu.svg": "d72c3e004e279b20679fdbfeb5450a27",
"assets/images/svg/kimchi.svg": "7a4e65583993cf4c2f54b5ab4b71252d",
"assets/images/svg/loading_failed_white.svg": "085f49e5f883fd79a17b9a124a0c59a8",
"assets/images/svg/person.svg": "68fc0be7506f9ea6a8ff34d75e0958bf",
"assets/images/svg/milk.svg": "658d5c746bffacd1449bfe4e8ce41b99",
"assets/images/svg/searchbar_search.svg": "37fa28da27fd3d3d75732c62f3a4d1f6",
"assets/images/svg/steak.svg": "cdc327bed12659e00debcd79190605d3",
"assets/images/svg/side.svg": "a4a8dcd79ebb7ac4ca9405bc34e8b80f",
"assets/images/svg/arrow_back.svg": "26ef477c60f6776731939cb58753c5ff",
"assets/images/svg/searchbar_food.svg": "a7adc71400bfb3023e14bba5105bac4f",
"assets/images/svg/category_tea.svg": "8da0d954d14918d977ff1e1b795a2c11",
"assets/images/svg/dessert.svg": "fbd03f5d7264229b712031385f811283",
"assets/images/svg/person_selected.svg": "cd37e03a23c0afaeb5ef3914f964ca7c",
"assets/images/svg/comment_reply_arrow.svg": "995dfdb3cca669cdb9687f9a16aaf5d9",
"assets/images/svg/foodranking_3.svg": "4b01293033fe77e55f456f0a35b545f9",
"assets/images/svg/x.svg": "f127b0cca56c55b306c9f9ce1c0db57b",
"assets/images/svg/question.svg": "1897a32b739c9ebb5cba5f071e9c23be",
"assets/images/svg/yookryu.svg": "7867dc08bdd87cfdd73fcb2fa4657322",
"assets/images/svg/foodranking_2.svg": "716780e179be007ae58148f56887874a",
"assets/images/svg/chaesoryu.svg": "6f46faf002f2587758a1bfece4d7619b",
"assets/images/svg/time.svg": "a6f339946706c5ffad33210c5b49d290",
"assets/images/svg/foodranking_1.svg": "453fb5e202b96be1b8d37763465bfece",
"assets/images/svg/no.svg": "e65e942a3b7da8fea84036b23c372cee",
"assets/images/svg/favorite_selected.svg": "631a9c9338395514d3866467d51da53b",
"assets/images/svg/category_etc.svg": "53b7238b3df238748ba8fa8bb424b1fd",
"assets/images/svg/yoodongsik.svg": "8673dea7675c9f2b80553ae4bda9df20",
"assets/images/svg/vertical_dots.svg": "abd324d601adec0159b4276ec92229f1",
"assets/images/svg/foodranking_4.svg": "f85268b082d0a645fba0dab7607034df",
"assets/images/svg/arrow_right.svg": "055f14c9d0537cd662b526a928880f44",
"assets/images/svg/loading_failed_grey.svg": "fa6b7fa7788b1964552addbfd3e5c50e",
"assets/images/svg/searchbar_notice.svg": "205c8c62aba513cbb0612cd9f1c97988",
"assets/images/svg/refresh.svg": "9df17041526dd7f349d8aa8e4f75efd8",
"assets/images/svg/gwailryu.svg": "25ba19343a38313ab555ca87478dcc62",
"assets/images/svg/favorite.svg": "eae4f7569c5af7af549bb0619f328a20",
"assets/images/svg/jam.svg": "bef1b341c00d4a00c5eb0ce23f0453b9",
"assets/images/svg/tea.svg": "3843b29ec8ae57b8554ace745b1c81ec",
"assets/images/svg/chat.svg": "8f2ba9e6657f89575c560560e614edf4",
"assets/images/svg/home_grey.svg": "e7d48d968e2f431ffc586e1c87861152",
"assets/images/svg/bookmark_selected.svg": "72dc6f7b35ee44366b585809078db4a0",
"assets/images/svg/home_selected.svg": "fbb2c41772cf6797cebf0dc3f92408ec",
"assets/images/svg/edit.svg": "743b9a0d40e12a58c11daa805ef62c3b",
"assets/images/svg/searchbar_disease.svg": "ecfe53843517ea58a0818c6fd66e061b",
"assets/images/svg/search_selected.svg": "a9fa41c84260ae1e1bd699d2ffa212fd",
"assets/images/svg/like_selected.svg": "fb3d20dab02142f5f4e9fcfe2414c7b9",
"assets/images/svg/disease_6.svg": "6a5060ad72536e37d31d15cd878aa04d",
"assets/images/svg/etc.svg": "e5b574e67fe61856c9082979933044ea",
"assets/images/svg/salad.svg": "36668ad6ad5a95bd4830cc41ea4340c4",
"assets/images/svg/seafood.svg": "550bae8c50f73e4b38aa284fff1ae129",
"assets/images/svg/disease_5.svg": "6f74ce37453350475346ed2a41880159",
"assets/images/svg/disease_4.svg": "aa45ec5c28c087b992f6fb55f3f9a0e0",
"assets/images/svg/rice.svg": "63035678ce7d5f2fe65c23ead248efd1",
"assets/images/svg/maindish.svg": "b60d1c3bbea2a28e6966ae38afd899b9",
"assets/images/svg/bookmark.svg": "62ce528ff61ce7c41c3c4d0ef9f53613",
"assets/images/svg/disease_1.svg": "5257a5ff883df4f4bddf3ad88e678638",
"assets/images/svg/searchbar_ingredient.svg": "0a27ed4ae4af7bd074a216317c3f9f65",
"assets/images/svg/disease_3.svg": "59b7c6ddd9b81e70f2183b365b7b1992",
"assets/images/svg/disease_2.svg": "dc0831b7caf77b38ad83f34f24294986",
"assets/images/ad1.png": "502e7cc648e789d21450998c4d3c3b99",
"assets/images/loading/loadingFoodRecommendContainer.png": "ebb12e6a2a64b50969a43539e4ad7ae7",
"assets/images/detail_cancer/detail_lung_cancer.jpg": "b9bc1b8660965ebb3e42ff41548334a1",
"assets/images/detail_cancer/detail_we_cancer.jpg": "ff5258550ff13958b3617b124003949f",
"assets/images/detail_cancer/detail_colorectal_cancer.jpg": "5438d739c8a4dc9c164077ac6847590a",
"assets/images/detail_cancer/detail_liver_cancer.jpg": "3d5b887f94976f863a20079bb8a1ba1f",
"assets/images/detail_cancer/detail_thyroid_cancer.jpg": "b90d434e95f1a18f5440fc966d4afb9b",
"assets/images/detail_cancer/detail_breast_cancer.jpg": "3009fa5cde16af94cbab1ea3a1966172",
"assets/images/loading_failed_white_png.png": "7edf7fcd6fe272dfd2c3f84229347898",
"assets/images/2.0x/ad1.png": "954e7fb8b020e7b7913c5568f3e25752",
"assets/images/2.0x/not_try_any_food.jpg": "ba9001b6670cdc452dd9918cfa77bdff",
"assets/images/2.0x/searchbar_logo.png": "41a86f435166d282cbb749b42a84fbbc",
"assets/images/2.0x/loginrequest_arrow.png": "54d9a0563022d7f0ff8c06e4acb26c6b",
"assets/images/2.0x/disease_intro.png": "15f3590814267610e424dc9874631a56",
"assets/images/not_try_any_food.jpg": "a6e77a7322de7d0516797a3039a50d91",
"assets/images/food4.png": "6137bde74f6fca61eea913a72b0a221d",
"assets/images/searchbar_logo.png": "80b3a2946f2440fdece142a40e17de85",
"assets/images/food2.png": "ae4c825f34738b536432a1af312f0f85",
"assets/images/food3.png": "ba77222dc05202f0d80c45ae706bb921",
"assets/images/3.0x/ad1.png": "9fa4e17557441742cd7b0842f91fdd91",
"assets/images/3.0x/not_try_any_food.jpg": "d913843198e9ccfa61887b55da0c62c0",
"assets/images/3.0x/searchbar_logo.png": "0d86c1c4e0974bc33786b15feb515d3b",
"assets/images/3.0x/loginrequest_arrow.png": "54781f9c52da80e4b3438b4f7fb527d7",
"assets/images/3.0x/disease_intro.png": "b6d32550cbf08faa0d50c18c45945369",
"assets/images/food1.png": "35b26667cc37b022b356793684b84c2f",
"assets/images/profile_sample.png": "e85584c9c3c13a375831206634532357",
"assets/images/loginrequest_arrow.png": "7f1037173b08f234adf0af7868d1b6bc",
"assets/images/oma4.png": "ac458a36a961161f4822c4771d2fbf45",
"assets/images/4.0x/ad1.png": "3daa6672620a1594762881a112a034bd",
"assets/images/4.0x/not_try_any_food.jpg": "58b763dd935ad894da17e3a9a47e03f4",
"assets/images/4.0x/searchbar_logo.png": "6c17db60c55b369677cafb11dbe8e80b",
"assets/images/4.0x/loginrequest_arrow.png": "205496b79ed508c661c12d65227a8239",
"assets/images/4.0x/disease_intro.png": "9d8c4ee362c39f7d2eb8ef494db00020",
"assets/images/oma5.png": "1fc21c6318e1cda4fb6c9ada3102426b",
"assets/images/logo.png": "78e6ebc4a9b50122d3bea8fcbc8f8660",
"assets/images/oma2.png": "8b7c92d31b8191c1a7fe23d26857dcb3",
"assets/images/oma3.png": "c29b71bd8cb789d8de40626703090ea5",
"assets/images/disease_intro.png": "bec40cc0b3937e1305760797dba2f695",
"assets/images/loading_failed_grey_png.png": "b18f2ffbf8fde72690cb93575fcd95e7",
"assets/AssetManifest.json": "cc73abe7384e8666fb930478da399c69",
"assets/NOTICES": "69fa421f448a9b87ca811d5f746029ae",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/fonts/MaterialIcons-Regular.otf": "7e7a6cccddf6d7b20012a548461d5d81",
"assets/assets/04.svg": "f85268b082d0a645fba0dab7607034df",
"assets/assets/checkedoff.svg": "ffb05e5c24bad1970ae35b7d02e06260",
"assets/assets/search.svg": "37fa28da27fd3d3d75732c62f3a4d1f6",
"assets/assets/arrowrightend.svg": "6eb5c462f0fad98eb660ccfc127c4dca",
"assets/assets/list.svg": "fb17e9c17b17e6d02da02aa036851d23",
"assets/assets/plus.png": "70dd60fcc38a2964a55452eb47b56da4",
"assets/assets/user.svg": "9e20362f7d3417f9659d18a399a0e050",
"assets/assets/arrow.svg": "26ef477c60f6776731939cb58753c5ff",
"assets/assets/circle.svg": "3ceebc3a003a987c75bc400d93c519bb",
"assets/assets/girl.svg": "bdf9c525ca171888d6a9d30eb5efdfce",
"assets/assets/02.svg": "ec767b6ae7fa05432f07f2206368d7e1",
"assets/assets/letter.svg": "a2435b28d74975f6286b847f0d40e11e",
"assets/assets/logout.svg": "999f8bfdda8b662675d1196143ed61be",
"assets/assets/insertcolor.svg": "e5112ae28c8c4267265c6a92d6482d79",
"assets/assets/03.svg": "4b01293033fe77e55f456f0a35b545f9",
"assets/assets/01.svg": "453fb5e202b96be1b8d37763465bfece",
"assets/assets/Ellipse%2520111.png": "3c777662c0878c54f1ff0be4ac42257a",
"assets/assets/imgonboarding.png": "077074d604192392306d171f4c28b50a",
"assets/assets/arrowdown.svg": "65c850e35c2c000b4e3a12fb581d1e28",
"assets/assets/x.svg": "570b1c8f169521accb6c2f7e186af0ca",
"assets/assets/savecolor.svg": "ded5c2a1d3b06c2cb8cafc42a13c85a7",
"assets/assets/star_sample.png": "e873f1afa2a551dd1066e116b2584240",
"assets/assets/darrow.svg": "e4a6a9dcddca37e68616cdec42b6653d",
"assets/assets/recipe_sample.png": "dae810cf5b15580780e527af331ebe07",
"assets/assets/pen.svg": "14d72d6d079195b7e35b66e184e9c82e",
"assets/assets/off.svg": "d0877e5cae94c70a296f21699f646737",
"assets/assets/arrowright.svg": "878a29b364c2a97167cc0b732de08793",
"assets/assets/time.svg": "b9c70fe54340757a58e3acfdbe511f01",
"assets/assets/girl.jpg": "daf507ed0756ba2a47347541b931f12f",
"assets/assets/Complete.svg": "8c3836b8158af820677959e7e067b1ba",
"assets/assets/circleSelected.svg": "39048be2c41f9b58686ebfdd43e573d2",
"assets/assets/on.svg": "ce39c4fedb7e74cfbc79bd01951e5010",
"assets/assets/paper.svg": "9e6fb42b03064f4314eb085f5a931d85",
"assets/assets/plus.svg": "765928e84319630d2f46ce184cf7558c",
"assets/assets/insert.svg": "e6f38e03c3ebcea7cfa6401c8f664dff",
"assets/assets/loadingHealthData.svg": "46e371822a3323e347367620c2a5221e",
"assets/assets/patientselected.svg": "9c1e74e9e3d9b4a45f978635e031e471",
"assets/assets/save.svg": "b44a529e755346f4e901e8af988b4afe",
"assets/assets/top.png": "b6faea4e01c0ca78baa0ff8229c33a1d",
"assets/assets/food_img/food_background.png": "01202f879dede635cb57a858d4ecbb36",
"assets/assets/food_img/4.png": "f7a54d5fc0c6f5649a069b34bf4effef",
"assets/assets/food_img/2.png": "75f1f355105a62f83a6a9880a03f1fb4",
"assets/assets/food_img/3.png": "a9118a5a15d42898365099d3c9e1b9d0",
"assets/assets/food_img/1.png": "7f22bf2e4469fd26ea45a7b301b87ff2",
"assets/assets/Setting.svg": "f9535c292870d7fa8d1e7023f295177d",
"assets/assets/deletemenu.svg": "abd324d601adec0159b4276ec92229f1",
"assets/assets/patientunselected.svg": "24453ec359f4623a6b3b42e4bbe603c5",
"assets/assets/chat.svg": "d41d8cd98f00b204e9800998ecf8427e",
"assets/assets/guardianunselected.svg": "18d682f095a59c42c0a93199e3389db1",
"assets/assets/camera.svg": "296515537227c41276008560ea602159",
"assets/assets/onboarding.png": "224ef890faf34ef5cc6725dee8b47a13",
"assets/assets/icons/04.svg": "f85268b082d0a645fba0dab7607034df",
"assets/assets/icons/search.svg": "37fa28da27fd3d3d75732c62f3a4d1f6",
"assets/assets/icons/like.svg": "dbd254fd07a4864478374bb99eee675e",
"assets/assets/icons/02.svg": "ec767b6ae7fa05432f07f2206368d7e1",
"assets/assets/icons/03.svg": "4b01293033fe77e55f456f0a35b545f9",
"assets/assets/icons/01.svg": "453fb5e202b96be1b8d37763465bfece",
"assets/assets/icons/dot.svg": "18309cee94a8b40f84c74f35da0400e4",
"assets/assets/icons/question.svg": "b898bf74903e68c478d1a56fa413c7cc",
"assets/assets/icons/darrow.svg": "e4a6a9dcddca37e68616cdec42b6653d",
"assets/assets/icons/off.svg": "8bcd633ad484e3dc376407c128a6ea28",
"assets/assets/icons/time.svg": "6b4e374a4e30cf09985ccf66984e0ccd",
"assets/assets/icons/on.svg": "ce39c4fedb7e74cfbc79bd01951e5010",
"assets/assets/icons/share.svg": "69d6afce984c7c1373ba218ace73e644",
"assets/assets/icons/comment.svg": "2909ff7fec108094a5cd2056aafc638b",
"assets/assets/icons/bookmark.svg": "dd2b29864eb51b7361d294081e9e7c24",
"assets/assets/profile_img/person_round.png": "ce840a3fa79c493a36df310c96292592",
"assets/assets/profile_img/2.png": "11569362b65882b88ca0b4fa87e2b09d",
"assets/assets/profile_img/3.png": "3d0546df302691460917a80a4353213d",
"assets/assets/profile_img/1.png": "9d641a54800b375c31dca2bb46560821",
"assets/assets/faq.svg": "cac5b05c001bda453d3d0fc3392417b2",
"assets/assets/tag_warp.svg": "f19bc5e6205e34e1d774dd2a6720d0a2",
"assets/assets/avatar_sample.png": "e85584c9c3c13a375831206634532357",
"assets/assets/circleUnselected.svg": "04549569e309737cbb5d6a7643571fbd",
"assets/assets/video.svg": "c0a11fdbfc3cf89a5eafd9b55b4546e1",
"assets/assets/handshake.svg": "dc20c4658aba9ca1d482fbb8d4d25db3",
"assets/assets/calendar.svg": "3e71a68c088482ded5bdc1f640e5c5b5",
"assets/assets/arrowup.svg": "41bea70ae8f8a6d37347b09bd980ac61",
"assets/assets/guardianselect.svg": "416823035f6f43bf4c38cd5619478957",
"assets/assets/error.svg": "fca02cc4241210eacc64f969bea3ca17",
"assets/assets/onboarding.svg": "cc80ae954c8882478aba66e3df731fd4",
"assets/assets/arrowleft.svg": "c4cbd319b13ec987fa1ced0bed1564ef",
"assets/assets/GuestText.svg": "9120d4ee5bb86b1e6bb26ff3979e4595",
"assets/assets/faqdatas.json": "8393af9aafcb25b10763ed36abd74386",
"assets/assets/loadingCircle.svg": "674a54cfc23a1933170ee28d0ec3c50b",
"assets/assets/heart.svg": "5a1c472ff21b4938255435e97504d13d",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
