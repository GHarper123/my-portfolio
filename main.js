document.addEventListener('DOMContentLoaded', function () {
    var typed = new Typed(".text", {
        strings: ["Frontend Developer", "Youtuber", "Web Developer", "Backend Developer"],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });
});


const header = document.querySelector("header");

window.addEventListener("scroll", function () {
    header.classList.toggle("sticky", this.window.scrollY > 120);
});

let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navlist.classList.toggle('active');
};

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navlist.classList.remove('active');
};





document.addEventListener('DOMContentLoaded', function () {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');

    hamburger.addEventListener('click', function () {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Sticky Header
    window.addEventListener('scroll', function () {
        const header = document.querySelector('header');
        header.classList.toggle('sticky', window.scrollY > 0);
    });

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Project Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            projectItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Form Submission
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const formData = new FormData(this);

            formMessage.textContent = "Sending...";
            formMessage.style.color = "#00bcd4";
            formMessage.style.display = "block";

            fetch(this.action, {
                method: 'POST',
                body: formData
            })
                .then(response => response.text())
                .then(result => {
                    if (result.trim() === "success") {
                        formMessage.textContent = "Thank you! Your message has been sent.";
                        formMessage.style.color = "green";
                        contactForm.reset();
                    } else {
                        formMessage.textContent = "Sorry, there was an error sending your message.";
                        formMessage.style.color = "red";
                    }
                    setTimeout(() => {
                        formMessage.style.display = "none";
                    }, 5000);
                })
                .catch(() => {
                    formMessage.textContent = "Sorry, there was an error sending your message.";
                    formMessage.style.color = "red";
                    setTimeout(() => {
                        formMessage.style.display = "none";
                    }, 5000);
                });
        });
    }

    // Animate Skill Bars on Scroll
    const skillBars = document.querySelectorAll('.skill-level');

    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';

            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }

    // Intersection Observer for skill bars animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // Animate technical skill circles
    document.querySelectorAll('.circle-bar').forEach(function (bar) {
        var percent = bar.getAttribute('data-percent');
        var circles = bar.querySelectorAll('circle');
        if (circles.length < 2) return;
        var circle = circles[1];
        var radius = 36;
        var circumference = 2 * Math.PI * radius;
        circle.style.strokeDasharray = circumference;
        circle.style.strokeDashoffset = circumference;
        setTimeout(function () {
            circle.style.transition = 'stroke-dashoffset 1.2s ease';
            circle.style.strokeDashoffset = circumference - (percent / 100) * circumference;
        }, 400);
    });

    // Animate skill bars
    document.querySelectorAll('.skill-level').forEach(function (bar) {
        var width = bar.style.width;
        bar.style.width = '0';
        setTimeout(function () {
            bar.style.transition = 'width 1.2s cubic-bezier(.4,2,.6,1)';
            bar.style.width = width;
        }, 600);
    });
});

function toggleInfo(event, id) {
    event.preventDefault();
    var info = document.getElementById(id);
    if (info.style.display === "none" || info.style.display === "") {
        info.style.display = "block";
    } else {
        info.style.display = "none";
    }
}