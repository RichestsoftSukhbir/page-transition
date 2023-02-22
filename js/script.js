function pageTransition() {
    var tl = gsap.timeline();
    tl.to('ul.transition li', {
        duration: 0.5,
        scaleY: 1,
        stagger: .2
    });
    tl.to('ul.transition li', {
        duration: 0.5,
        scaleY: 0,
        stagger: .2,
        delay: .1
    });
}
let pageHeading = document.querySelector('.page-heading');
let pageHeadTextContent = pageHeading.textContent;
let text = pageHeadTextContent.split('');

let result = '';

text.forEach(function (element) {
    result += (element.trim() === "") ? "" : "<span>" + element + "</span>";
});

pageHeading.innerHTML = result;

function contentAnimation() {
    gsap.from('.page-heading span', {
        duration: 1,
        y: 100,
        opacity: 0,
        stagger: 0.1
    });
}

function delay(n) {
    n = n || 2000;
    return new Promise(done => {
        setTimeout(() => {
            done();
        }, n);
    });
}

barba.init({
    sync: true,
    transitions: [{
        async leave(data) {
            const done = this.async();
            pageTransition();
            await delay(1500);
            done();
        },
        async enter(data) {
            contentAnimation();
        },
        async once(data) {
            contentAnimation();
        }

    }]
});

