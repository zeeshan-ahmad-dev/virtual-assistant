<template>
    <img id="logo" src="../assets/logo.jpg" alt="Logo" class="w-52 lg:w-[20vw]">
    <h1 class="text-2xl font-bold text-center lg:text-3xl text-aliceblue font-protest">
        I'm <span id="name" class="text-pink-500 text-3xl lg:text-[45px]">Neva </span>,Your <span id="va"
            class="text-cyan-400 text-3xl lg:text-[45px]">Virtual Assistant</span>
    </h1>
    <img :class="[voiceDisplay ? 'block' : 'hidden']" src="../assets/voice.gif" alt="Voice" id="voice" class="w-[150px]">
    <button :class="[['w-[95%]'],btnDisplay ? 'flex' : 'hidden']" @click="startRecognition"
        class="w-[30%] bg-gradient-to-r from-blue-600 to-pink-600 p-4 items-center justify-center gap-4 text-lg rounded-full border-none text-white shadow-[2px_2px_10px_rgb(21,145,207),2px_2px_10px_rgb(201,41,116)] cursor-pointer transition-all duration-300 hover:shadow-[2px_2px_20px_rgb(21,145,207),2px_2px_20px_rgb(201,41,116)] hover:tracking-wider">
        <img src="../assets/mic.svg" alt="Mic" class="h-6">
        <span id="content">{{ btnText }}</span>
    </button>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import run from '../config/gemini'

let btnText = ref('Click here to talk to me')
let btnDisplay = ref(true);
let voiceDisplay = ref(false);

onMounted(wishMe);

function wishMe() {
    let day = new Date();
    let hours = day.getHours;
    if (hours >= 0 && hours <= 12) {
        speak('Good Morning Zeeshan!');
    } else if (hours >= 12 && hours <= 16) {
        speak('Good Afternoon Zeeshan!');
    } else {
        speak('Good Evening Zeeshan!');
    }
}

function speak(text) {
    window.speechSynthesis.cancel();
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.lang = 'en-GB';
    text_speak.pitch = 1;
    window.speechSynthesis.speak(text_speak);
}

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    btnText.value = transcript;
    takeCommand(transcript.toLowerCase().trim());
}

function startRecognition() {
    recognition.start();
    btnDisplay.value = false;
    voiceDisplay.value = true;
}

async function takeCommand(message) {
    btnDisplay.value = true;
    voiceDisplay.value = false;

    if (message.includes('hello nive') || message.includes('hi niva') || message.includes('hello neve') || message.includes('hi neva') || message.includes('hello never') || message.includes('hi niha')) {
        speak('Hello Zeeshan! How can I assist you today?');
    }
    else if (message.includes('who are you') || message.includes('what are you') || message.includes('hu r u')) {
        speak("I am your Virtual Assistant, created by Zeeshan Ahmad. I'm here to help!");
    }
    else if (message.includes('what is your name') || message.includes("what's your name")) {
        speak("My name is Neva, your smart assistant.");
    }
    else if (message.includes('open') && message.includes('youtube')) {
        speak("Opening YouTube...");
        window.open("https://www.youtube.com/", "_blank");
    }
    else if (message.includes('open') && message.includes('google')) {
        speak("Opening Google...");
        window.open("https://www.google.com/", "_blank");
    }
    else if (message.includes('open') && message.includes('facebook')) {
        speak("Opening Facebook...");
        window.open("https://www.facebook.com/", "_blank");
    }
    else if (message.includes('open') && message.includes('linkedin')) {
        speak("Opening LinkedIn...");
        window.open("https://www.linkedin.com/", "_blank");
    }
    else if (message.includes('open') && message.includes('instagram')) {
        speak("Opening Instagram...");
        window.open("https://www.instagram.com/", "_blank");
    }
    else if (message.includes('open') && message.includes('whatsapp')) {
        speak("Opening WhatsApp...");
        window.open("https://web.whatsapp.com/");
    }
    else if (message.includes('time')) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak(`The current time is ${time}.`);
    }
    else if (message.includes('date')) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "long", year: "numeric" });
        speak(`Today's date is ${date}.`);
    }
    else if (message.includes('search for')) {
        let query = message.replace('search for', '').trim();
        speak(`Searching Google for ${query}...`);
        window.open(`https://www.google.com/search?q=${query}`);
    }
    else if (message.includes('calculate') || message.includes('calculator')) {
        speak("Opening a calculator for you...");
        window.open("https://www.google.com/search?q=calculator");
    }
    else {
        try {
            const text = await run(message)
            speak(text);
        } catch (err) {
            speak("Failed to respond. Please try again");
        }
    }


}
</script>
