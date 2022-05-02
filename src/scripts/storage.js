import { PageData } from "./pageData";
// import { startingPageArray } from "./startingState";
import startingPageArray from "./startingState.json"
console.log(startingPageArray)
export const initStorage = () => {
    if(!localStorage.getItem('pageArray')){
        localStorage.setItem('pageArray', JSON.stringify(startingPageArray));
        addPage();
        // addPage();
    }
}

export const getPages = () => {
    let pages = JSON.parse(localStorage.getItem('pageArray'));
    // console.log("%cRETRIEVEING PAGES","color:orange")
    // console.log(pages);
    return pages;
}

export const getPage = (num) => {
    return getPages()[num];
}


export const setPage = (pageNum, data) => {
    let pages = getPages();


    pages[pageNum] = data;


    localStorage.setItem('pageArray', JSON.stringify(pages));

}


export const addPage = () => {
    let pages = getPages();

    pages.push(new PageData(pages.length))

    localStorage.setItem('pageArray', JSON.stringify(pages));

    console.log(`%cADDING PAGE %c#${pages.length}`,"color:orange","background-color:orange;color:black;padding:2px;");

}

