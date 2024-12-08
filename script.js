"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.getElementById("resumeForm");
const resumePage = document.getElementById("resumePage");
const resumePhoto = document.getElementById("resume-Photo");
const resumeName = document.getElementById("resumeName");
const resumeEmail = document.getElementById("resumeEmail");
const resumePhone = document.getElementById("resumePhone");
const resumeEducation = document.getElementById("Education");
const resumeSkills = document.getElementById("Skills");
const resumeContentButton = document.getElementById("resumeContent");
const resumeButton = document.getElementById("submit");
const resumeShare = document.getElementById("share");
const resumeEdit = document.getElementById("edit");
const resumePdf = document.getElementById("PDF");
form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const education = document.getElementById("education").value;
    const skills = document.getElementById("skills").value;
    const photo = document.getElementById("Photo");
    const photoFile = photo.files ? photo.files[0] : null;
    let photoBase64 = ``;
    if (photoFile) {
        photoBase64 = yield fileToBase64(photoFile);
        localStorage.setItem("resume-Photo", photoBase64);
        resumePhoto.src = photoBase64;
    }
    (_a = document.querySelector(".resume-container")) === null || _a === void 0 ? void 0 : _a.classList.add("hidden");
    resumePage.classList.remove("hidden");
    resumeName.textContent = `Name : ${name}`;
    resumeEmail.textContent = `Email : ${email}`;
    resumePhone.textContent = `Phone : ${phone}`;
    resumeEducation.textContent = `Education:  ${education}`;
    resumeSkills.textContent = `Skills : ${skills}`;
    const share = new URLSearchParams({
        name: name,
        email: email,
        phone: phone,
        education: education,
        skills: skills,
    });
    const userURL = `${window.location.origin}?${share.toString()}`;
    resumeShare.addEventListener("click", () => {
        navigator.clipboard.writeText(userURL);
        alert("Link Copy");
    });
    window.history.replaceState(null, '', `${share.toString()}`);
}));
function fileToBase64(file) {
    return new Promise((res, rej) => {
        const reader = new FileReader();
        reader.onloadend = () => res(reader.result);
        reader.onerror = rej;
        reader.readAsDataURL(file);
    });
}
resumeEdit.addEventListener("click", () => {
    var _a;
    updateFormFromResume();
    (_a = document.querySelector(".resume-container")) === null || _a === void 0 ? void 0 : _a.classList.remove("hidden");
    resumePage.classList.add("hidden");
});
function updateFormFromResume() {
    var _a, _b, _c;
    const [education] = ((_a = resumeEducation.textContent) === null || _a === void 0 ? void 0 : _a.split("from")) || [];
    document.getElementById("name").value = resumeName.textContent || '';
    document.getElementById("email").value = ((_b = resumeEmail.textContent) === null || _b === void 0 ? void 0 : _b.replace('Email', '')) || '';
    document.getElementById("phone").value = ((_c = resumePhone.textContent) === null || _c === void 0 ? void 0 : _c.replace('Phone', '')) || '';
    document.getElementById("Education").value = education || '';
    document.getElementById("skills").value = resumeSkills.textContent || '';
}
resumePdf.addEventListener('click', () => {
    if (typeof html2pdf === 'undefined') {
        alert('Error:html2pdf library is not dawnloded');
        return;
    }
    const resumeDownload = {
        margin: 0.5,
        filename: 'Resume Dawnload.PDF',
        image: { typeof: 'jpeg', quality: 1.0 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'latter', orientation: 'portrait' }
    };
    console.log(resumeDownload);
    html2pdf()
        .from(resumeContentButton)
        .set(resumeDownload)
        .save()
        .catch((error) => {
        console.error("Dawnload PDF", error);
    });
});
window.addEventListener('DOMContentLoaded', () => {
    var _a;
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name') || '';
    const email = params.get('email') || '';
    const phone = params.get('phone') || '';
    const education = params.get('education') || '';
    const skills = params.get('skills') || '';
    if (name || email || phone || education || skills) {
        resumeName.textContent = `Name : ${name}`;
        resumeEmail.textContent = `Email : ${email}`;
        resumePhone.textContent = `Phone : ${phone}`;
        resumeEducation.textContent = `Education:  ${education}`;
        resumeSkills.textContent = `Skills : ${skills}`;
        const userPhoto = localStorage.getItem("resume-Photo");
        if (userPhoto) {
            resumePhoto.src = userPhoto;
        }
        (_a = document.querySelector(".resume-container")) === null || _a === void 0 ? void 0 : _a.classList.add("hidden");
        resumePage.classList.remove("hidden");
    }
});
resumePhoto.style.width = "150px";
resumePhoto.style.height = "150px";
resumePhoto.style.objectFit = "cover";
resumePhoto.style.borderRadius = "50%";
resumePhoto.style.display = "block";
resumePhoto.style.margin = "0 auto";
