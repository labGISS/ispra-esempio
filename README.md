# Pygeoapi TEST
Esempio di client per un server pygeoapi. 

Questo esempio integra la ricerca sul [Repertorio Nazionale dei Dati Territoriali (RNDT)](https://geodati.gov.it/geoportale/) con un dataset pubblicato su un server pygeapi.

Per configurare il server, vedere cartella `server`.

Per eseguire il client:

```
   npm install
   npm run start   
```

All'indirizzo [http://localhost:4200/search/](http://localhost:4200/search) dovrebbe essere visualizzato il form di ricerca sul RNDT. 

Compilando il campo `Testo` col testo `AQD`, il primo risultato della ricerca dovrebbe essere reperito dal server pygeoapi.


## Implementazione
Il collegamento al server pygeoapi è implementato nel file `src/app/providers/pygeoapi.service.ts`
