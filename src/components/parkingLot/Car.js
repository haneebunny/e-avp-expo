
export default function Car() {
    const thickness = 6;

    return (
        <group name="normalCar" position={[0, thickness / 2, 0]}>

            <mesh>
                <cylinderGeometry args={[20, 20, 5, 15, 2]} />
                <meshStandardMaterial color={'white'} />
            </mesh>

            <mesh position={[0, 5, 0]}>
                <cylinderGeometry args={[2, 20, 5, 3, 2]} />
                <meshStandardMaterial color={'cyan'} />
            </mesh>

        </group>
    )
}