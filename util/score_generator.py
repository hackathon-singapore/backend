from vector_generator import Vector_generator

vector_generator = Vector_generator( )

translation_list_test = [
	"This is a test",
	"Please don't panic",
	"Hope everything works fine on the first go"
]

print vector_generator.vectorize( translation_list_test )