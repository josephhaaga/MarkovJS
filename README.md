#MarkovJS#

A vanilla JS library for generating Markov Chains.

## Why? ##

AWS closed my account (who knows why) and I don't want to pay to host a dumb Markov bot. This offloads the computation to the client, so I can host FOR FREE using GitHub Pages.

## How? ##

```<script src="markov.js"></script>```

then

```var m=model.train("pass in the training text here");```

``` m.generate(2); ```

returns 

```> "training text" ```

## To do ##

Prevent repeating n-grams by checking for bigram in master_string within generate() for-loop.