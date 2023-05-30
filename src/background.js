chrome.commands.onCommand.addListener(async (command) => {
    console.log('onCommand event received for message: ', command);
    if (command === "paste-slowly") {
        await chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0];
            console.log('tab', tab);
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: async () => {
                    const inputString = await navigator.clipboard.readText();
                    let index = 0;
                    const intervalId = setInterval(() => {
                        if (index >= inputString.length) {
                            clearInterval(intervalId);
                            return;
                        }
                        const char = inputString.charAt(index);
                        
                        const activeElement = document.activeElement;
                        if (activeElement) {
                            
                            activeElement.value += char;
                            
                        }
                        index++;
                    }, Math.floor(Math.random() * 100) + 50);
                }
            },
            function (results) {
                console.log("Script executed:", results);
            });
        });
        
    }
});