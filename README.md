# Homework Enhancers

Avviare il progetto con

```
yarn start
```

## Flusso

Al primo caricamento dell'app, viene fatta una richiesta alla One Call API 1.0 di OpenWeather con delle coordinate di default corrispondenti alla città di Shanghai.

Successivamente l'utente può geolocalizzarsi attraverso la Navigator Geolocation WEB API oppure cercare una città nella barra di ricerca.

### Geolocalizzazione

Geolocalizzato l'utente, una chiamata alla Geocoding (reverse) API recupera il nome della città a partire dalle coordinate restituite dalla Navigator Geolocation WEB API.

### Ricerca

L'input dell'utente viene passato come parametro alla Geocoding (direct) API che restituisce un elenco di massimo 5 match con cui vengono costruite le opzioni del select. Alla selezione di un'opzione, viene chiamata la One Call API 1.0.

### Città preferite

L'utente può aggiungere la città corrente a un elenco di città "preferite". Queste città possono essere al massimo due e vengono aggiornate con il metodo FIFO.

## Unsplash API

La UI fornita suggerisce la presenza di un'immagine per ogni città di cui si sta visualizzando il meteo. Non volendo limitare la ricerca dell'utente creando un subset di città supportate e hardcodando gli asset delle immagini, ho cercato un'API che mi permettesse di recuperare dinamicamente una foto. La route `photos/random` dell'API di Unsplash accetta come parametro una keyword (i.e. il nome della città) e restituisce un'immagine pertinente. L'API non è molto soddisfacente perché ha un rate-limit di 50 richieste all'ora e perché le immagini restituite non sempre sono rilevanti, ma ho ritenuto che ai fini del test fosse sufficiente.

## Miglioramenti

Per rimanere nel perimetro di un homework e rispettare la tempistica di una settimana, ho fatto alcune scelte tecniche che non avrei fatto in ambito lavorativo o personale.
Sicuramente sono da migliorare:

-   Ricerca: la chiamata all'API di OpenWeather deve essere debounced, al momento viene fatta a ogni onChange dell'input.
-   Loading: lo spinner globale andrebbe trasformato in una gestione del caricamento a livello del singolo componente.
-   Error handling: la gestione degli errori dovrebbe essere implementata su tutte le chiamate in modo capillare.
-   Responsiveness: la responsiveness della UI potrebbe essere migliorata con delle media query e con layout appositi a seconda del device in uso (react-device-detect)
