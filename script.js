"use strict"

///////////////////////////////////////
// Modal window
const modal = document.querySelector(".modal")
const overlay = document.querySelector(".overlay")
const btnCloseModal = document.querySelector(".btn--close-modal")
const btnsOpenModal = document.querySelectorAll(".btn--show-modal")

const btnScrollTo = document.querySelector(".btn--scroll-to")
const section1 = document.querySelector("#section--1")

const tabsContainer = document.querySelector(".operations__tab-container")
const tabs = document.querySelectorAll(".operations__tab")
const tabsContent = document.querySelectorAll(".operations__content")

const nav = document.querySelector(".nav")

const openModal = function () {
	modal.classList.remove("hidden")
	overlay.classList.remove("hidden")
}

const closeModal = function () {
	modal.classList.add("hidden")
	overlay.classList.add("hidden")
}

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal))

btnCloseModal.addEventListener("click", closeModal)
overlay.addEventListener("click", closeModal)

document.addEventListener("keydown", function (e) {
	if (e.key === "Escape" && !modal.classList.contains("hidden")) {
		closeModal()
	}
})

btnScrollTo.addEventListener("click", function (e) {
	const s1coords = section1.getBoundingClientRect()
	console.log(s1coords)

	console.log(e.target.getBoundingClientRect())

	console.log("Current  scroll (X/Y)", window.pageXOffset, window.pageYOffset)
	console.log(
		"width/height",
		document.documentElement.clientWidth,
		document.documentElement.clientHeight
	)

	// Scrolling					x-coord				y-coord
	// window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset)

	// window.scrollTo({
	// 	left: s1coords.left + window.pageXOffset,
	// 	top: s1coords.top + window.pageYOffset,
	// 	behavior: "smooth"
	// })

	section1.scrollIntoView({ behavior: "smooth" })
})

/////////////////////////////////////////////////////////////////////////////////////
// Page navigation

// 1. Add event listener to common parent element
// 2. Determine what element originated the event
document.querySelector(".nav__links").addEventListener("click", function (e) {
	e.preventDefault()

	//Matching strategy
	if (e.target.classList.contains("nav__link")) {
		const id = e.target.getAttribute("href")
		console.log(id)
		document.querySelector(id).scrollIntoView({ behavior: "smooth" })
	}
})

// document.querySelectorAll(".nav__link").forEach(function (el) {
// 	el.addEventListener("click", function (e) {
// 		e.preventDefault()
// 		const id = this.getAttribute("href")
// 		console.log(id)
// 		document.querySelector(id).scrollIntoView({ behavior: "smooth" })
// 	})
// })

/////////////////////////////////////////////////////////////////////////////////////
// Tabbed Component

tabsContainer.addEventListener("click", function (e) {
	const clicked = e.target.closest(".operations__tab")

	// Guard clause
	if (!clicked) return

	// Remove active classes
	tabs.forEach((tab) => tab.classList.remove("operations__tab--active"))
	tabsContent.forEach((content) =>
		content.classList.remove("operations__content--active")
	)
	// Active tab
	clicked.classList.add("operations__tab--active")

	// Activate content area
	console.log(clicked.dataset.tab)
	document
		.querySelector(`.operations__content--${clicked.dataset.tab}`)
		.classList.add("operations__content--active")
})

// Menu fade animation
const handleHover = function (e) {
	if (e.target.classList.contains("nav__link")) {
		const link = e.target
		const siblings = link.closest(".nav").querySelectorAll(".nav__link")
		const logo = link.closest(".nav").querySelector("img")

		siblings.forEach((el) => {
			if (el !== link) el.style.opacity = this
		}, this)

		logo.style.opacity = this
	}
}

// Passing argument into handler
nav.addEventListener("mouseover", handleHover.bind(0.5))
nav.addEventListener("mouseout", handleHover.bind(1))

// Sticky navigation (Scroll Event)
// const initialCoords = section1.getBoundingClientRect()
// console.log(initialCoords)

// window.addEventListener("scroll", () => {
// 	console.log(window.scrollY)

// 	if (window.scrollY > initialCoords.top) {
// 		nav.classList.add("sticky")
// 	} else nav.classList.remove("sticky")
// })

// Sticky navigation (Intersection Observer API)
/* const obsCallback = function (entries, observer) {
	entries.forEach((entry) => {
		console.log(entry)
	})
}

const obsOptions = {
	root: null,
	threshold: 0.1
}

const observer = new IntersectionObserver(obsCallback, obsOptions)
observer.observe(section1) */

const header = document.querySelector(".header")
const navHeight = nav.getBoundingClientRect().height

const stickyNav = function (entries) {
	const [entry] = entries
	if (!entry.isIntersecting) {
		nav.classList.add("sticky")
	} else {
		nav.classList.remove("sticky")
	}
}

const headerObserver = new IntersectionObserver(stickyNav, {
	root: null,
	threshold: 0,
	rootMargin: `-${navHeight}px`
})
headerObserver.observe(header)

// Reveal sections
const allSections = document.querySelectorAll(".section")

const revealSection = function (entries, observer) {
	const [entry] = entries

	if (!entry.isIntersecting) return
	entry.target.classList.remove("section--hidden")
	observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection, {
	root: null,
	threshold: 0.15
})
allSections.forEach(function (section) {
	sectionObserver.observe(section)
	// section.classList.add("section--hidden")
})

//Lazy loading images
const imgTargets = document.querySelectorAll("img[data-src]")

const loadImg = function (entries, observer) {
	const [entry] = entries

	if (!entry.isIntersecting) return

	// Replace src with data-src
	entry.target.src = entry.target.dataset.src

	entry.target.addEventListener("load", function () {
		entry.target.classList.remove("lazy-img")
	})
	observer.unobserve(entry.target)
}

const imgObserver = new IntersectionObserver(loadImg, {
	root: null,
	threshold: 0,
	rootMargin: "-200px"
})

imgTargets.forEach((img) => imgObserver.observe(img))

// Slider
const slider = () => {
	const slides = document.querySelectorAll(".slide")
	const btnLeft = document.querySelector(".slider__btn--left")
	const btnRight = document.querySelector(".slider__btn--right")
	const dotContainer = document.querySelector(".dots")

	let currentSlide = 0
	const maxSlide = slides.length

	// Functions
	const createDots = () => {
		slides.forEach((_, i) => {
			dotContainer.insertAdjacentHTML(
				"beforeend",
				`<button class="dots__dot" data-slide="${i}"></button`
			)
		})
	}

	/* 	const activateDot = (slide) => {
		document.querySelectorAll(".dots__dot").forEach((dot) => {
			dot.classList.remove("dots__dot--active")
		})
		document
			.querySelector(`dots__dot[data-slide="${slide}"]`)
			.classList.add("dots__dot--active")
	} */

	const goToSlide = (slide) => {
		slides.forEach(
			(slide, index) =>
				(slide.style.transform = `translateX(${
					100 * (index - currentSlide)
				}%)`)
		)
	}

	const nextSlide = () => {
		if (currentSlide === maxSlide - 1) {
			currentSlide = 0
		} else {
			currentSlide++
		}

		goToSlide(currentSlide)
	}

	const prevSlide = () => {
		if (currentSlide === 0) {
			currentSlide = maxSlide - 1
		} else {
			currentSlide--
		}
		goToSlide(currentSlide)
	}

	const init = () => {
		goToSlide(0)
		createDots()
	}
	init()

	// Event Handlers
	// Next slide
	btnRight.addEventListener("click", nextSlide)
	btnLeft.addEventListener("click", prevSlide)

	document.addEventListener("keydown", (e) => {
		if (e.key === "ArrowLeft") prevSlide()
		if (e.key === "ArrowRight") nextSlide()
	})

	dotContainer.addEventListener("click", function (e) {
		if (e.target.classList.contains("dots__dot")) {
			currentSlide = +e.target.dataset.slide
			goToSlide(currentSlide)
		}
	})
}
slider()
/* 
console.log(document.documentElement)
console.log(document.head)
console.log(document.body)

const header = document.querySelector(".header")
const allSections = document.querySelectorAll(".section")
console.log(allSections)

document.getElementById("section--1")
const allButtons = document.getElementsByTagName("button")
console.log(allButtons)

console.log(document.getElementsByClassName("btn"))
// Creating and inserting elements
const message = document.createElement("div")
message.classList.add("cookie-message")
message.textContent = "We use cookies for improved functionality and analytics."
message.innerHTML =
	"We use cookies for improved functionality and analytics. <button class='btn btn--close-cookie'>Got it!</button>"

// header.prepend(message)
header.append(message)
// header.append(message.cloneNode(true))

// header.before(message)
header.after(message)

// Delete elements
document.querySelector(".btn--close-cookie").addEventListener("click", () => {
	//message.parentElement.removeChild(message)
	message.remove()
})

console.log("STYLES =======================================")
// Styles
message.style.backgroundColor = "#37383d"
message.style.width = "120%"

console.log(getComputedStyle(message).height)

message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px"

document.documentElement.style.setProperty("--color-primary", "orangered")

console.log("ATTRIBUTES =======================================")

// Attributes
const logo = document.querySelector(".nav__logo")
console.log(logo.alt)
console.log(logo.src)
console.log(logo.className)

console.log(logo.nonStandardAttribute)

console.log(logo.getAttribute("nonStandardAttribute"))
logo.setAttribute("company", "Bankist")
console.log(logo.src)
console.log(logo.getAttribute("src"))

const link = document.querySelector(".nav__link--btn")
console.log(link.href)
console.log(link.getAttribute("href"))

// Data attributes
console.log(logo.dataset.versionNumber)

//Classes
logo.classsList.add("c", "j") // set more than one class
logo.classList.remove("c", "j")
logo.classList.toggle("c")
logo.classList.contains("c")

// Don't use (overwrite other classes)
location.className = "jonas"
 */

// BUTTON SCROLLING

/* 
const h1 = document.querySelector("h1")

const alertH1 = (e) => {
	alert("Event activated!")
}

// h1.onmouseenter = (e) => {
// 	alert("Event activated!")
// }

h1.addEventListener("mouseenter", alertH1)

setTimeout(() => h1.removeEventListener("mouseenter", alertH1), 3000)
 */

// const randomInt = (min, max) =>
// 	Math.floor(Math.random() * (max - min + 1) + min)

// const randomColor = () => {
// 	return `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)},${randomInt(
// 		0,
// 		255
// 	)})`
// }

// document.querySelector(".nav__links").addEventListener("click", function (e) {
// 	this.style.backgroundColor = randomColor()
// 	console.log("CONTAINER", e.target, e.currentTarget)
// })
// document.querySelector(".nav__link").addEventListener("click", function (e) {
// 	this.style.backgroundColor = randomColor()
// 	console.log("LINK", e.target, e.currentTarget)
// Stop propagation
// 	e.stopPropagation()
// })
// document.querySelector(".nav").addEventListener(
// 	"click",
// 	function (e) {
// 		this.style.backgroundColor = randomColor()
// 		console.log("NAV", e.target, e.currentTarget)
// 	},
// 	true
// )
/* 
// DOM TRAVERSING
const h1 = document.querySelector("h1")

// Going downwards: child
console.log("CHILDS")
console.log(h1.querySelectorAll(".highlight"))
console.log(h1.childNodes)
console.log(h1.children)
h1.firstElementChild.style.color = "white"
h1.lastElementChild.style.color = "orangered"

// Going upwards. prarents
console.log("PARENTS")
console.log(h1.parentNode)
console.log(h1.parentElement)
h1.closest(".header").style.background = "var(--gradient-secondary)"
h1.closest("h1").style.background = "red" /* the element itself-
 */
/*  
// Going sideways: siblings
console.log("SIBLINGS")
console.log(h1.previousElementSibling)
console.log(h1.nextElementSibling)
console.log(h1.previousSibling)
console.log(h1.nextSibling)
const childrens = h1.parentElement.children
const childrenLength = h1.parentElement.children.length
for (let el of childrens){
	console.log(el)
	if(el !== h1) el.style.transform = 'scale(0.5)'
}
*/

document.addEventListener("DOMContentLoaded", (e) => {
	console.log("HTML parsed and DOM tree built!", e)
})

window.addEventListener("load", (e) => {
	console.log("Page fully loaded!", e)
})

/* window.addEventListener("beforeunload", (e) => {
	e.preventDefault()
	console.log(e)
	e.returnValue = ""
}) */
