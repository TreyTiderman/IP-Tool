<!-- Javascript -->
<script>
  import { validIPv4, validMask } from "../js/helper.js"

  // Event Dispatcher
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  // Data
  export let data = {
    value: {
      ip: "192.168.1.2",
      mask: "255.255.255.0",
      gateway: "192.168.1.1",
      dns: ["192.168.1.1", "1.1.1.1"],
    },
    placeholder: {
      ip: "192.168.1.2",
      mask: "255.255.255.0",
      gateway: "192.168.1.1",
      dns: ["192.168.1.1", "1.1.1.1"],
    }
  }

</script>

<!-- HTML -->
<article>

  <!-- Set IP -->
  <div class="grid">
    <label>
      IP address <br>
      <!-- svelte-ignore a11y-autofocus -->
      <input type="text" autofocus
        bind:value={data.value.ip}
        on:keyup={event => { if (event.key === "p") data.value.ip = data.placeholder.ip }}
        class:error={!validIPv4(data.value.ip) && data.value.ip !== ""}
        placeholder={data.placeholder.ip}> <br>
      {#if !validIPv4(data.value.ip) && data.value.ip !== ""}
        <div class="flex error-message">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentcolor"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zm32 224c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32z"/></svg>
          <small>{validIPv4(data.value.ip, true)}</small>
        </div>
      {/if}
    </label>
    <label>
      Subnet Mask <br>
      <input type="text"
        bind:value={data.value.mask}
        on:keyup={event => { if (event.key === "p") data.value.mask = data.placeholder.mask }}
        class:error={!validMask(data.value.mask) && data.value.mask !== ""}
        placeholder={data.placeholder.mask}> <br>
      {#if !validMask(data.value.mask) && data.value.mask !== ""}          
        <div class="flex error-message">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentcolor"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zm32 224c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32z"/></svg>
          <small>{validMask(data.value.mask, true)}</small>
        </div>
      {/if}
    </label>
    <label>
      Gateway <span class="dim">(optional)</span> <br>
      <input type="text"
        bind:value={data.value.gateway}
        on:keyup={event => { if (event.key === "p") data.value.gateway = data.placeholder.gateway }}
        class:error={!validIPv4(data.value.gateway) && data.value.gateway !== ""}
        placeholder={data.placeholder.gateway}> <br>
      {#if !validIPv4(data.value.gateway) && data.value.gateway !== ""}          
        <div class="flex error-message">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentcolor"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zm32 224c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32z"/></svg>
          <small>{validIPv4(data.value.gateway, true)}</small>
        </div>
      {/if}
    </label>
  </div>
  
  <!-- Set DNS -->
  <div class="grid">
    <label>
      DNS 1 <span class="dim">(optional)</span> <br>
      <input type="text"
        bind:value={data.value.dns[0]}
        on:keyup={event => { if (event.key === "p") data.value.dns[0] = data.placeholder.dns[0] }}
        class:error={!validIPv4(data.value.dns[0]) && data.value.dns[0] !== ""}
        class:correct={validIPv4(data.value.dns[0])}
        placeholder={data.placeholder.dns[0]}> <br>
      {#if !validIPv4(data.value.dns[0]) && data.value.dns[0] !== ""}          
        <div class="flex error-message">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentcolor"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zm32 224c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32z"/></svg>
          <small>{validIPv4(data.value.dns[0], true)}</small>
        </div>
      {/if}
    </label>
    <label>
      DNS 2 <span class="dim">(optional)</span> <br>
      <input type="text"
        bind:value={data.value.dns[1]}
        on:keyup={event => { if (event.key === "p") data.value.dns[1] = data.placeholder.dns[1] }}
        class:error={!validIPv4(data.value.dns[1]) && data.value.dns[1] !== ""}
        placeholder={data.placeholder.dns[1]}> <br>
      {#if !validIPv4(data.value.dns[1]) && data.value.dns[1] !== ""}          
        <div class="flex error-message">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentcolor"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zm32 224c0 17.7-14.3 32-32 32s-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32z"/></svg>
          <small>{validIPv4(data.value.dns[1], true)}</small>
        </div>
      {/if}
    </label>
    <div>
      <br>
      <div class="buttons">
        <button class="green"
          on:click={() => dispatch("set", data.value)}
          disabled={
            (
                validIPv4(data.value.ip) &&
                validMask(data.value.mask) &&
                (validIPv4(data.value.gateway) || data.value.gateway === "") &&
                (validIPv4(data.value.dns[0]) || data.value.dns[0] === "") &&
                (validIPv4(data.value.dns[1]) || data.value.dns[1] === "")
                ) === false
              }
          >
          Set 
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentcolor"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
        </button>
        <button class="cyan"
          on:click={() => dispatch("save", data.value)}
          disabled={
            (
              validIPv4(data.value.ip) &&
              validMask(data.value.mask) &&
              (validIPv4(data.value.gateway) || data.value.gateway === "") &&
              (validIPv4(data.value.dns[0]) || data.value.dns[0] === "") &&
              (validIPv4(data.value.dns[1]) || data.value.dns[1] === "")
            ) === false
          }
        >
          Save 
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentcolor"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"/></svg>
        </button>
      </div>
    </div>
  </div>

</article>

<!-- CSS -->
<style>
  article {
    height: 100%;
    overflow: auto;
    display: flex;
    flex-wrap: wrap;
    gap: var(--gap);
    padding: var(--gap);
    align-content: flex-start;
  }
  @media (max-width: 40rem) {
    article {
      display: flex;
      flex-direction: column;
    }
  }
  .buttons {
    display: flex;
    flex-wrap: wrap;
    gap: var(--gap);
    
    align-self: flex-end;
  }

  .buttons button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--pad);
    flex: 1 0 0%;
  }

  input {
    font-family: var(--font-mono);
  }

</style>