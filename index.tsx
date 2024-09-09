/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { definePluginSettings } from "@api/Settings";
import { Devs } from "@utils/constants";
import definePlugin, { OptionType } from "@utils/types";

let observer: MutationObserver | undefined = undefined;

const settings = definePluginSettings({
    title: {
        type: OptionType.STRING,
        description: "The static window title",
        default: "Discord"
    }
});

export default definePlugin({
    name: "StaticTitle",
    hidden: IS_VESKTOP,
    description: "Gives a static window title",
    authors: [Devs.sadan],
    settings,
    start() {
        if(IS_VESKTOP) return;

        const title = document.querySelector("title");

        if(!title) throw new Error("could not find title");

        observer = new MutationObserver(() => {
            if(title.innerHTML === settings.store.title) return;
            title.innerHTML = settings.store.title;
        });

        observer.observe(title, {
            childList: true
        });
    },
    stop(){
        observer?.disconnect();
    }
});
