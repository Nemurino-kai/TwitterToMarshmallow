'use strict';

function replaceTwitterBio() {

    // UserProfileHeader_Itemsの要素があるか
    const profile = document.querySelector("[data-testid='UserProfileHeader_Items']");
    // 無いならば、処理を終わる
    if (!profile) {
        return;
    }

    // URLからscreen_nameの抽出
    const user_name = location.pathname.split("/")[1];
    // screen_nameが取り出せないorすでにリンク生成済み
    if (!user_name || document.body.getAttribute("data-user_name") === user_name) {
        return;
    }
    document.body.setAttribute("data-user_name", user_name);


    const xhr = new XMLHttpRequest();
    xhr.onload = function() {

        // 正しく読み込めるなら、リンクの生成を行う
        if (this.status == 200) {
        
        // 説明文の生成
        var description = user_name + "にマシュマロを投げる";

        // リンクの生成
        const icon = chrome.runtime.getURL("images/20marsh.png")
        const question = '<img src=' + icon + '><a href="https://marshmallow-qa.com/' + user_name + '" target="_blank" role="link" data-focusable="true" style="color:#00acee;"> <strong>' + description + '</strong></a>';

        // profileにリンクを挿入する
        profile.insertAdjacentHTML("afterbegin", question);
        }

    };
    xhr.open("GET", "https://marshmallow-qa.com/" + user_name.toLocaleLowerCase());
    xhr.send();


}

const observer = new MutationObserver(replaceTwitterBio)
observer.observe(document.body, {childList: true, subtree: true});
