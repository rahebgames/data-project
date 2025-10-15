# String to Tree

A class project that recursively draws a tree based on user inputted data. Defaults to 500 words of "lorem ipsum" to show how the tree looks with larger input sizes (and because it looks cool).

Made for a school project.

## Question from assignment

"Describe your artistic intent for this project. What were you hoping to achieve? Are you happy with the results it creates? Were the results as you expected or did they come out different?"

## Answer

My intent was to visulize data using fractals. I started out with a fractal tree, as that is a good combination of fractals and common data types (like binary search trees). However, I quickly realized that there is very little data one could encode into a fractal due to the repetetive nature. Because of this, the final result isn't quite a fractal, but the code behind it is very similar. Despite not quite being what I set out to do, I am nonetheless very happy with the result, as it is pretty much what I envisioned regardless.

## How it works

First, the program encodes the entered string using the fflate library (<https://github.com/101arrowz/fflate>). Then, it uses the encoded data to select an angle for each branch, then draws the branches at that angle. I restricted the max angle it can choose, as without the restriction the tree is an unintelligable mess.

## Default text

The following text is what is used to generate the tree if the input field is empty:

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce laoreet felis at magna aliquet ullamcorper. Vivamus mauris odio, tempus a luctus eget, consequat malesuada nulla. Praesent vestibulum sed leo ut imperdiet. Fusce interdum ipsum id ipsum semper, vitae lacinia elit aliquam. Cras cursus odio et dignissim ornare. Phasellus est felis, laoreet sed mi non, pretium pellentesque orci. Duis id tellus non purus posuere vulputate at vitae mi. Suspendisse finibus lectus sem, ac luctus metus facilisis in. Praesent eget diam a nulla tincidunt volutpat. Integer finibus consequat purus, maximus eleifend lorem bibendum quis. Integer volutpat dictum sem sed tempus. Pellentesque vitae lectus in turpis vulputate congue. Vivamus dignissim diam mi, a tristique quam mattis vitae. Pellentesque non cursus nisl. Aenean et gravida nibh. Morbi interdum est at erat condimentum faucibus. Curabitur sit amet turpis libero. Sed varius luctus rutrum. Vivamus laoreet volutpat lectus, non eleifend metus ultrices non. Proin lobortis bibendum dolor et malesuada. Quisque at quam lectus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec odio elit, lobortis vitae magna ut, dapibus rutrum diam. Vestibulum dolor nulla, vulputate non volutpat vel, lobortis sit amet ligula. Sed eget purus auctor, aliquam nunc id, iaculis erat. Fusce in auctor urna. Etiam quis sapien molestie, cursus ex id, hendrerit eros. Morbi maximus sem id fringilla iaculis. Vestibulum fringilla arcu vitae ipsum hendrerit, sed mattis nisl vulputate. In ornare nisl vitae nulla condimentum, at fringilla sapien molestie. Donec gravida vitae massa non mattis. Integer tincidunt massa in dapibus mattis. Pellentesque porttitor purus lacus, eget molestie nunc mollis eu. In fringilla ex orci, sit amet dignissim risus sagittis sit amet. Maecenas faucibus lectus a pharetra egestas. Nunc tincidunt vel libero a tristique. Curabitur eu semper augue, ac mattis est. Curabitur a aliquam elit. In sagittis tempus ligula, eget interdum sem fermentum auctor. Maecenas blandit nisi neque, sit amet pharetra ligula feugiat eget. Suspendisse potenti. Phasellus dictum augue sit amet erat sagittis, pellentesque egestas tortor facilisis. Morbi cursus metus et ligula molestie, ut lobortis est lobortis. Ut metus erat, aliquet a leo eu, sodales luctus turpis. Nunc commodo, nisi vel dignissim eleifend, libero nunc sollicitudin felis, ut ultricies magna quam sit amet mauris. Vestibulum condimentum egestas sem, vitae tincidunt velit scelerisque in. Vestibulum at sem tortor. Integer ac tortor lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus venenatis turpis libero, et porta leo malesuada id. Nam nisl arcu, fermentum at tempus ut, condimentum quis nisi. Donec eu mauris eu nisl varius scelerisque. Nulla ut magna vel tellus convallis facilisis nec id dolor. Aliquam pellentesque odio ac gravida mollis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec quis elit vehicula, facilisis orci id, vestibulum velit. Proin sed iaculis metus. Pellentesque id nisi tristique, fermentum tortor sed, rutrum odio. Nam tincidunt euismod diam vel ornare. Quisque convallis metus molestie, ultrices nisi id, iaculis magna. Phasellus tempus in nulla nec vulputate. Phasellus semper, quam sit amet varius pretium, libero enim elementum turpis, eget.

## Credits

The base of the project was taken from the starting code from one of my other assignments for another class (<https://github.com/rndmcnlly/cmpm-121-f25-d1>), as it was easier than creating a new Vite / Deno project from scratch and the code was blank anyways. The code to generate the tree is inspired by this repository: <https://github.com/PikoCanFly/fractal-tree>, though heavy modifications were required and the code basically works entirely differently now.
